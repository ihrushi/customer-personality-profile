const metrics = [
  {
    key: "openness",
    label: "Openness",
    chartLabel: "Openness",
    score: 3,
    relative: 60,
    color: "#1b8a84",
    comment: "Practical; wants resolution more than new options.",
  },
  {
    key: "conscientiousness",
    label: "Conscientiousness",
    chartLabel: "Conscient.",
    score: 4,
    relative: 80,
    color: "#183a59",
    comment: "Values records, steps, and timelines.",
  },
  {
    key: "extraversion",
    label: "Extraversion",
    chartLabel: "Extrav.",
    score: null,
    relative: null,
    color: "#8b96a3",
    comment: "Not enough signal from this sample.",
  },
  {
    key: "agreeableness",
    label: "Agreeableness",
    chartLabel: "Agreeable.",
    score: 4,
    relative: 80,
    color: "#6f3d77",
    comment: "Polite but expects accountability.",
  },
  {
    key: "emotional-stability",
    label: "Emotional stability",
    chartLabel: "Stability",
    score: 3,
    relative: 60,
    color: "#b7791f",
    comment: "Controlled tone, with escalation risk rising.",
  },
];

const metricList = document.querySelector("#metricList");
const radarHost = document.querySelector("#radarChart");
const toast = document.querySelector("#toast");
const rawText = document.querySelector("#rawText");
const additionalDetailsInput = document.querySelector("#additionalDetailsInput");
const customerWritingSample = rawText.textContent.trim();

function currentAdditionalDetails() {
  return additionalDetailsInput.value.trim();
}

function buildRawDataText() {
  const additionalDetails = currentAdditionalDetails();
  return [
    "INPUT 1: Customer email / writing sample",
    customerWritingSample,
    "",
    "INPUT 2: Seller observations / instances",
    additionalDetails || "None provided.",
  ].join("\n");
}

function buildSummaryText() {
  const additionalDetails = currentAdditionalDetails();
  return [
    "Customer Personality Profile",
    "Model used: Big Five / OCEAN, adapted for sales communication from writing-style signals.",
    "Confidence: Medium-high",
    "",
    ...metrics.map((metric) => {
      const score = metric.score === null ? "N/A" : `${metric.score}/5`;
      const relative = metric.relative === null ? "N/A" : `${metric.relative}%`;
      return `${metric.label}: ${score}, ${relative} - ${metric.comment}`;
    }),
    "",
    "Sales posture: Respond with empathy, ownership, exact next steps, and a realistic timeline.",
    "Next move: Send a same-day update naming the owner, current status, resolution path, and ETA.",
    "",
    "Additional observations / instances:",
    additionalDetails || "None provided.",
  ].join("\n");
}

function renderRawData() {
  rawText.textContent = buildRawDataText();
}

function renderMetricList() {
  metricList.innerHTML = metrics
    .map((metric) => {
      const score = metric.score === null ? "N/A" : `${metric.score} / 5`;
      const relative = metric.relative === null ? "N/A" : `${metric.relative}%`;
      return `
        <div class="metric-row" style="--metric-color: ${metric.color}">
          <div class="metric-name">${metric.label}</div>
          <div class="metric-score">${score}</div>
          <div class="metric-relative">${relative}</div>
          <p class="metric-comment">${metric.comment}</p>
        </div>
      `;
    })
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
}

function renderFallbackRadar() {
  const width = Math.max(320, Math.floor(radarHost.clientWidth || 620));
  const isNarrow = width < 480;
  const height = isNarrow ? 340 : 410;
  const center = { x: width / 2, y: isNarrow ? 166 : 196 };
  const radius = Math.min(width * 0.31, isNarrow ? 98 : 138);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "OCEAN relative signal radar chart");

  const create = (name, attrs) => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };

  const angleFor = (index) => -Math.PI / 2 + (index * Math.PI * 2) / metrics.length;
  const point = (index, value, scale = 1) => {
    const angle = angleFor(index);
    const distance = radius * scale * (value / 100);
    return {
      x: center.x + Math.cos(angle) * distance,
      y: center.y + Math.sin(angle) * distance,
    };
  };

  [20, 40, 60, 80, 100].forEach((tick) => {
    const points = metrics.map((_, index) => point(index, tick));
    svg.appendChild(
      create("polygon", {
        points: points.map((item) => `${item.x},${item.y}`).join(" "),
        fill: tick === 100 ? "#fbfcfc" : "none",
        stroke: "#d9dfdf",
        "stroke-width": "1",
      }),
    );
  });

  svg.appendChild(
    create("text", {
      x: center.x + 8,
      y: center.y - radius + 4,
      class: "radar-ring-label",
    }),
  );
  svg.lastChild.textContent = "100%";

  const profilePoints = metrics.map((metric, index) => point(index, metric.relative ?? 0));
  svg.appendChild(
    create("polygon", {
      points: profilePoints.map((item) => `${item.x},${item.y}`).join(" "),
      fill: "rgba(27, 138, 132, 0.18)",
      stroke: "#1b8a84",
      "stroke-width": "3",
    }),
  );

  metrics.forEach((metric, index) => {
    const outer = point(index, 118);
    const dot = point(index, metric.relative ?? 0);
    const cos = Math.cos(angleFor(index));
    const anchor = cos < -0.18 ? "end" : cos > 0.18 ? "start" : "middle";
    svg.appendChild(
      create("line", {
        x1: center.x,
        y1: center.y,
        x2: point(index, 100).x,
        y2: point(index, 100).y,
        stroke: "#d9dfdf",
        "stroke-width": "1",
      }),
    );
    svg.appendChild(
      create("circle", {
        cx: dot.x,
        cy: dot.y,
        r: metric.relative === null ? 5 : 7,
        fill: metric.relative === null ? "#fffdf8" : metric.color,
        stroke: metric.color,
        "stroke-width": "2",
      }),
    );
    svg.appendChild(
      create("text", {
        x: outer.x,
        y: outer.y,
        "text-anchor": anchor,
        class: "radar-label",
      }),
    );
    svg.lastChild.textContent = metric.chartLabel;
    svg.appendChild(
      create("text", {
        x: outer.x,
        y: outer.y + 15,
        "text-anchor": anchor,
        class: "radar-score",
      }),
    );
    svg.lastChild.textContent = metric.relative === null ? "N/A" : `${metric.relative}%`;
  });

  radarHost.innerHTML = "";
  radarHost.appendChild(svg);
}

function renderD3Radar() {
  if (!window.d3) {
    renderFallbackRadar();
    return;
  }

  const width = Math.max(320, Math.floor(radarHost.clientWidth || 620));
  const isNarrow = width < 480;
  const height = isNarrow ? 340 : 410;
  const center = { x: width / 2, y: isNarrow ? 166 : 196 };
  const radius = Math.min(width * 0.31, isNarrow ? 98 : 138);
  const angleByKey = new Map(
    metrics.map((metric, index) => [
      metric.key,
      -Math.PI / 2 + (index * Math.PI * 2) / metrics.length,
    ]),
  );
  const radial = d3.scaleLinear().domain([0, 100]).range([0, radius]);
  const line = d3
    .lineRadial()
    .angle((metric) => angleByKey.get(metric.key))
    .radius((metric) => radial(metric.relative ?? 0))
    .curve(d3.curveLinearClosed);

  radarHost.innerHTML = "";

  const svg = d3
    .select(radarHost)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "OCEAN relative signal radar chart");

  const chart = svg.append("g").attr("transform", `translate(${center.x}, ${center.y})`);

  chart
    .selectAll(".radar-ring")
    .data([20, 40, 60, 80, 100])
    .join("polygon")
    .attr("points", (tick) =>
      metrics
        .map((metric) => {
          const itemAngle = angleByKey.get(metric.key);
          return `${Math.cos(itemAngle) * radial(tick)},${Math.sin(itemAngle) * radial(tick)}`;
        })
        .join(" "),
    )
    .attr("fill", (tick) => (tick === 100 ? "#fbfcfc" : "none"))
    .attr("stroke", "#d9dfdf")
    .attr("stroke-width", 1);

  chart
    .selectAll(".radar-axis")
    .data(metrics)
    .join("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (metric) => Math.cos(angleByKey.get(metric.key)) * radial(100))
    .attr("y2", (metric) => Math.sin(angleByKey.get(metric.key)) * radial(100))
    .attr("stroke", "#d9dfdf")
    .attr("stroke-width", 1);

  chart
    .append("path")
    .datum(metrics)
    .attr("d", line)
    .attr("fill", "rgba(27, 138, 132, 0.18)")
    .attr("stroke", "#1b8a84")
    .attr("stroke-width", 3);

  chart
    .selectAll(".radar-point")
    .data(metrics)
    .join("circle")
    .attr("cx", (metric) => Math.cos(angleByKey.get(metric.key)) * radial(metric.relative ?? 0))
    .attr("cy", (metric) => Math.sin(angleByKey.get(metric.key)) * radial(metric.relative ?? 0))
    .attr("r", (metric) => (metric.relative === null ? 5 : 7))
    .attr("fill", (metric) => (metric.relative === null ? "#fffdf8" : metric.color))
    .attr("stroke", (metric) => metric.color)
    .attr("stroke-width", 2);

  const labelGroups = chart
    .selectAll(".radar-label-group")
    .data(metrics)
    .join("g")
    .attr("transform", (metric) => {
      const itemAngle = angleByKey.get(metric.key);
      const labelRadius = radius + (isNarrow ? 34 : 42);
      return `translate(${Math.cos(itemAngle) * labelRadius}, ${Math.sin(itemAngle) * labelRadius})`;
    });

  labelGroups
    .append("text")
    .attr("class", "radar-label")
    .attr("text-anchor", (metric) => {
      const xComponent = Math.cos(angleByKey.get(metric.key));
      return xComponent < -0.18 ? "end" : xComponent > 0.18 ? "start" : "middle";
    })
    .text((metric) => metric.chartLabel);

  labelGroups
    .append("text")
    .attr("class", "radar-score")
    .attr("y", 15)
    .attr("text-anchor", (metric) => {
      const xComponent = Math.cos(angleByKey.get(metric.key));
      return xComponent < -0.18 ? "end" : xComponent > 0.18 ? "start" : "middle";
    })
    .text((metric) => (metric.relative === null ? "N/A" : `${metric.relative}%`));

  chart
    .append("text")
    .attr("class", "radar-ring-label")
    .attr("x", 8)
    .attr("y", -radius + 4)
    .text("100%");
}

document.querySelector("#printBtn").addEventListener("click", () => window.print());

document.querySelector("#copySummaryBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildSummaryText());
    showToast("Copied profile summary");
  } catch {
    showToast("Copy unavailable");
  }
});

renderMetricList();
renderRawData();
renderD3Radar();
additionalDetailsInput.addEventListener("input", renderRawData);
window.addEventListener("resize", renderD3Radar);
