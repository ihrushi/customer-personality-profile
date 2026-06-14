# Customer Personality Profile

Static browser tools for building an ethical, sales-oriented customer personality profile from writing-style signals.

## Main report

Open `ocean-profile-report.html` to view the polished customer profile report for the Daniel Harper sample. The report includes:

- Big Five / OCEAN metric scoring
- Relative signal percentages
- D3 radar visualization with SVG fallback
- Sales posture and next move
- Free-form seller observations and instances
- Raw data used, including customer text and seller notes

## Additional workspace

`index.html` contains the broader Oracle Analytica workspace for OCI sales plays and professional-signal analysis.

## Run locally

Open the HTML files directly, or serve the folder locally:

```bash
python3 -m http.server 4174
```

Then open:

- `http://localhost:4174/ocean-profile-report.html`
- `http://localhost:4174/index.html`

## Ethical stance

The profiling output is a writing-style read for sales preparation only. It is not a validated psychometric assessment and should not be used for clinical, sensitive-trait, or manipulative targeting.
