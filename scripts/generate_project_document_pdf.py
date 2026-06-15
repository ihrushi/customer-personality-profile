#!/usr/bin/env python3
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Image,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "customer_personality_profile_project_document.pdf"
SCREENSHOT = ROOT / "assets" / "customer-personality-profile-screenshot.png"

NAVY = colors.HexColor("#132437")
INK = colors.HexColor("#172231")
MUTED = colors.HexColor("#536273")
TEAL = colors.HexColor("#178f8b")
AMBER = colors.HexColor("#b76b08")
PAPER = colors.HexColor("#fbfaf7")
PANEL = colors.HexColor("#f4f7f8")
BORDER = colors.HexColor("#d8e0e5")


def build_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=31,
            leading=34,
            textColor=INK,
            spaceAfter=8,
        ),
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=AMBER,
            uppercase=True,
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=12,
            leading=16,
            textColor=MUTED,
            spaceAfter=14,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=INK,
            spaceBefore=10,
            spaceAfter=8,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.7,
            leading=13.5,
            textColor=INK,
            spaceAfter=6,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=9,
            textColor=MUTED,
        ),
        "value": ParagraphStyle(
            "Value",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=INK,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="Courier",
            fontSize=7.7,
            leading=10,
            textColor=INK,
        ),
        "center_note": ParagraphStyle(
            "CenterNote",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }


def page_frame(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 7 * mm, width, 7 * mm, stroke=0, fill=1)
    canvas.setStrokeColor(BORDER)
    canvas.line(doc.leftMargin, 14 * mm, width - doc.rightMargin, 14 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 9 * mm, "Customer Personality Profile")
    canvas.drawCentredString(width / 2, 9 * mm, "Created by Hrushikesh Khopkar | Feedback: Hrushikesh.khopkar@oracle.com")
    canvas.drawRightString(width - doc.rightMargin, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def card(title, value, styles):
    return Table(
        [
            [Paragraph(title.upper(), styles["label"])],
            [Paragraph(value, styles["value"])],
        ],
        colWidths=[48 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        ),
    )


def panel(title, paragraphs, styles, accent):
    body = [Paragraph(title, styles["h2"])]
    for text in paragraphs:
        body.append(Paragraph(text, styles["body"]))
    return Table(
        [[body]],
        colWidths=[82 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LINEBEFORE", (0, 0), (0, -1), 3, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        ),
    )


def usage_steps(styles):
    steps = [
        [
            Paragraph("1", styles["value"]),
            Paragraph("<b>Clone the repo</b><br/>Use org-approved GitHub access.", styles["body"]),
        ],
        [
            "",
            Preformatted(
                "git clone git@github.com:ihrushi/customer-personality-profile.git",
                styles["code"],
            ),
        ],
        [
            Paragraph("2", styles["value"]),
            Paragraph("<b>Install the skill locally</b><br/>Copy the packaged skill into Codex skills.", styles["body"]),
        ],
        [
            "",
            Preformatted(
                "mkdir -p ~/.codex/skills\n"
                "cp -R customer-personality-profile/skills/sales-psychometric-profile ~/.codex/skills/",
                styles["code"],
            ),
        ],
        [
            Paragraph("3", styles["value"]),
            Paragraph(
                "<b>Run the profile</b><br/>Ask Codex to use <font name='Courier'>sales-psychometric-profile</font>, then paste the customer writing sample.",
                styles["body"],
            ),
        ],
        [
            Paragraph("4", styles["value"]),
            Paragraph(
                "<b>Use the output</b><br/>Review OCEAN scores, relative signal strength, short sales comments, sales posture, and next move.",
                styles["body"],
            ),
        ],
        [
            Paragraph("5", styles["value"]),
            Paragraph(
                "<b>Open the report app</b><br/>Use <font name='Courier'>ocean-profile-report.html</font>, or serve the repo with <font name='Courier'>python3 -m http.server 4174</font>.",
                styles["body"],
            ),
        ],
    ]
    return Table(
        steps,
        colWidths=[10 * mm, 160 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LINEBEFORE", (0, 0), (0, -1), 3, TEAL),
            ]
        ),
    )


def fit_image(path, max_width, max_height):
    width, height = PILImage.open(path).size
    scale = min(max_width / width, max_height / height)
    image = Image(str(path))
    image.drawWidth = width * scale
    image.drawHeight = height * scale
    return image


def build_pdf():
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Customer Personality Profile",
        author="Hrushikesh Khopkar",
    )

    story = [
        Paragraph("PROJECT SUMMARY", styles["eyebrow"]),
        Paragraph("Customer Personality Profile", styles["title"]),
        Paragraph("Team Productivity | Individual Effort", styles["subtitle"]),
        Table(
            [[card("Project Title", "Customer Personality Profile", styles), card("Category", "Team Productivity", styles), card("Effort", "Individual", styles)]],
            colWidths=[56 * mm, 56 * mm, 56 * mm],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
        Spacer(1, 8),
        Table(
            [
                [
                    panel(
                        "Problem",
                        [
                            "Sales teams read customer messages every day, but writing-style signals are easy to miss.",
                            "Most profiling is either too vague to act on or too risky because it drifts into labels, guesses, and manipulation.",
                            "Sellers need a fast, repeatable way to read communication style and adapt the next engagement with clarity and respect.",
                        ],
                        styles,
                        AMBER,
                    ),
                    panel(
                        "Solution",
                        [
                            "Customer Personality Profile turns a customer writing sample into an ethical Big Five / OCEAN sales profile.",
                            "It produces five focused metrics, relative signal strength, short sales comments, and one practical next move.",
                            "The output is available as a polished HTML report and a reusable Codex skill for repeat use across teams.",
                        ],
                        styles,
                        TEAL,
                    ),
                ]
            ],
            colWidths=[86 * mm, 86 * mm],
            style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]),
        ),
        Spacer(1, 8),
        Paragraph("Usage", styles["h2"]),
        usage_steps(styles),
        Spacer(1, 8),
        Paragraph("Links", styles["h2"]),
        Paragraph(
            'GitHub: <link href="https://github.com/ihrushi/customer-personality-profile" color="#178f8b">https://github.com/ihrushi/customer-personality-profile</link><br/>'
            "Video: Add the demo recording link when available.<br/>"
            "Document: This PDF can be shared with the repo link for install and usage guidance.",
            styles["body"],
        ),
        PageBreak(),
        Paragraph("Product Snapshot", styles["title"]),
        Paragraph("Polished HTML report with OCEAN metrics, relative signal strength, radar visualization, sales posture, next move, and raw input reference.", styles["subtitle"]),
    ]

    max_width = A4[0] - doc.leftMargin - doc.rightMargin
    max_height = A4[1] - doc.topMargin - doc.bottomMargin - 42 * mm
    story.append(fit_image(SCREENSHOT, max_width, max_height))
    story.append(Spacer(1, 5))
    story.append(Paragraph("Screenshot from the Customer Personality Profile report app.", styles["center_note"]))

    doc.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
    print(OUTPUT)


if __name__ == "__main__":
    if not SCREENSHOT.exists():
        raise FileNotFoundError(f"Missing screenshot: {SCREENSHOT}")
    build_pdf()
