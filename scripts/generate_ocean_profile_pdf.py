from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_PATH = "ocean_sales_profile_daniel_harper.pdf"


profile_rows = [
    ["Openness", "3 / 5", "60%", "Practical; wants resolution more than new options."],
    ["Conscientiousness", "4 / 5", "80%", "Values records, steps, and timelines."],
    ["Extraversion", "N/A", "N/A", "Not enough signal from this sample."],
    ["Agreeableness", "4 / 5", "80%", "Polite but expects accountability."],
    ["Emotional stability", "3 / 5", "60%", "Controlled tone, with escalation risk rising."],
]


def build_pdf() -> None:
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=LETTER,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.58 * inch,
        bottomMargin=0.62 * inch,
        title="OCEAN Sales Profile - Daniel Harper",
        author="Hrushikesh Khopkar",
        subject="Sales-oriented OCEAN writing-style profile",
    )

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Kicker",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=10,
            textColor=colors.HexColor("#586474"),
            spaceAfter=6,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TitleCustom",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=27,
            textColor=colors.HexColor("#17202A"),
            spaceAfter=8,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubtitleCustom",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=14,
            textColor=colors.HexColor("#435263"),
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHeader",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=colors.HexColor("#17202A"),
            spaceBefore=8,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyCustom",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.6,
            leading=13,
            textColor=colors.HexColor("#263442"),
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallMuted",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.5,
            textColor=colors.HexColor("#697789"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Score",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.3,
            leading=12,
            textColor=colors.HexColor("#17202A"),
            alignment=TA_RIGHT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHeader",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=11,
            textColor=colors.white,
        )
    )

    story = []
    story.append(Paragraph("SALES PSYCHOMETRIC PROFILE", styles["Kicker"]))
    story.append(Paragraph("OCEAN Sales Profile", styles["TitleCustom"]))
    story.append(
        Paragraph(
            "Writing-style read for customer engagement planning. The model used is "
            "<b>Big Five / OCEAN</b>, adapted for sales communication signals.",
            styles["SubtitleCustom"],
        )
    )

    meta_data = [
        [
            Paragraph("<b>Prospect / customer</b><br/>Daniel Harper", styles["BodyCustom"]),
            Paragraph("<b>Confidence</b><br/>Medium-high", styles["BodyCustom"]),
            Paragraph("<b>Scale</b><br/>Score is out of 5; relative % is sample signal strength.", styles["BodyCustom"]),
        ]
    ]
    meta = Table(meta_data, colWidths=[2.0 * inch, 1.45 * inch, 3.0 * inch])
    meta.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F4F7FA")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#DDE5EE")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#DDE5EE")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(meta)
    story.append(Spacer(1, 0.18 * inch))

    story.append(Paragraph("Metric Summary", styles["SectionHeader"]))
    table_data = [
        [
            Paragraph("Metric", styles["TableHeader"]),
            Paragraph("Score /5", styles["TableHeader"]),
            Paragraph("Relative signal", styles["TableHeader"]),
            Paragraph("Sales comment", styles["TableHeader"]),
        ]
    ]
    for metric, score, relative, comment in profile_rows:
        table_data.append(
            [
                Paragraph(metric, styles["BodyCustom"]),
                Paragraph(score, styles["Score"]),
                Paragraph(relative, styles["Score"]),
                Paragraph(comment, styles["BodyCustom"]),
            ]
        )

    metric_table = Table(
        table_data,
        colWidths=[1.55 * inch, 0.78 * inch, 1.08 * inch, 3.04 * inch],
        repeatRows=1,
    )
    metric_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E79")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#D4DCE6")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(metric_table)
    story.append(Spacer(1, 0.18 * inch))

    posture_data = [
        [
            Paragraph("<b>Sales posture</b>", styles["BodyCustom"]),
            Paragraph(
                "Respond with empathy, ownership, exact next steps, and a realistic timeline.",
                styles["BodyCustom"],
            ),
        ],
        [
            Paragraph("<b>Next move</b>", styles["BodyCustom"]),
            Paragraph(
                "Send a same-day update naming the owner, current status, resolution path, and ETA.",
                styles["BodyCustom"],
            ),
        ],
    ]
    posture = Table(posture_data, colWidths=[1.25 * inch, 5.2 * inch])
    posture.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EEF4F8")),
                ("BACKGROUND", (1, 0), (1, -1), colors.HexColor("#FBFCFE")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#DDE5EE")),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#DDE5EE")),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(posture)
    story.append(Spacer(1, 0.16 * inch))

    story.append(
        Paragraph(
            "<b>Caveat:</b> This is a writing-style read only, not a validated psychometric "
            "assessment or a factual claim about the person's inner state.",
            styles["SmallMuted"],
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        Paragraph(
            "<b>Skill credit:</b> Created by Hrushikesh Khopkar. "
            "Feedback: Hrushikesh.khopkar@oracle.com.",
            styles["SmallMuted"],
        )
    )

    doc.build(story)


if __name__ == "__main__":
    build_pdf()
