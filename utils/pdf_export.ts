import { jsPDF } from "jspdf";
import { numbersDescription, type NumerologyProfile } from "./numerology.ts";

export function generateNumerologyPDF(profile: NumerologyProfile): void {
  const doc = new jsPDF();

  let y = 20;
  const pageHeight = 280;
  const margin = 20;
  const maxWidth = 170;

  const colors = {
    primary: [102, 126, 234] as [number, number, number],
    secondary: [118, 75, 162] as [number, number, number],
    accent: [56, 239, 125] as [number, number, number],
    dark: [51, 51, 51] as [number, number, number],
    light: [245, 245, 245] as [number, number, number],
    warning: [255, 193, 7] as [number, number, number],
  };

  const checkPageBreak = (needed = 20): boolean => {
    if (y + needed > pageHeight) {
      doc.addPage();
      y = 20;
      return true;
    }
    return false;
  };

  const addWrappedText = (
    text: string,
    x: number,
    yPos: number,
    maxW: number,
    lineHeight = 6,
  ): number => {
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, yPos);
    return lines.length * lineHeight;
  };

  const addSectionHeader = (title: string, addSpace = true): void => {
    if (addSpace) checkPageBreak(30);
    doc.setFillColor(...colors.primary);
    doc.rect(margin - 5, y - 5, 180, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, y + 3);
    doc.setTextColor(...colors.dark);
    y += 16;
  };

  const addSubsection = (title: string): void => {
    checkPageBreak(20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.secondary);
    doc.text(title, margin, y);
    doc.setTextColor(...colors.dark);
    y += 7;
  };

  // 1. Document Title
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.secondary);
  doc.text("Personalised Numerology Report", 105, y, { align: "center" });
  y += 15;

  // 2. Calculation of Name
  addSectionHeader("Calculation of Name", false);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  let letterCalculation = "";
  for (const item of profile.letterBreakdown) {
    letterCalculation += `${item.letter} (${item.type}) = ${item.position}\n`;
  }
  y += addWrappedText(letterCalculation, margin, y, maxWidth, 5);
  y += 3;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    `Destiny Sum = ${profile.destiny.rawSum} -> Reduced: ${profile.destiny.formatted}`,
    margin,
    y,
  );
  y += 6;
  doc.text(
    `Soul Desire (Vowels) = ${profile.soulDesire.rawSum} -> Reduced: ${profile.soulDesire.formatted}`,
    margin,
    y,
  );
  y += 6;
  doc.text(
    `Outer Personality (Consonants) = ${profile.outerPersonality.rawSum} -> Reduced: ${profile.outerPersonality.formatted}`,
    margin,
    y,
  );
  y += 14;

  // 3. Summary Profile
  checkPageBreak(45);
  addSectionHeader("Summary Overview");
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Subject: ${profile.name}  |  Birth Date: ${profile.birthDate.rawInput}`,
    margin,
    y,
  );
  y += 7;
  doc.text(
    `Core Numbers: Life Path ${profile.lifePath.formatted}  •  Personality ${profile.personality.formatted}  •  Destiny ${profile.destiny.formatted}  •  Personal Year ${profile.personalYear.formatted}`,
    margin,
    y,
  );
  y += 12;

  // 4. Numerology 3x3 Grid
  checkPageBreak(85);
  addSubsection("Pythagorean 3x3 Chart (Planes of Expression)");

  const gridX = margin + 15;
  const gridY = y;
  const cellSize = 22;

  // Matrix values: Mind (3, 6, 9), Soul (2, 5, 8), Physical (1, 4, 7)
  const gridMatrix = [
    [
      { label: "3", val: profile.grid.digits[3] || "-" },
      { label: "6", val: profile.grid.digits[6] || "-" },
      { label: "9", val: profile.grid.digits[9] || "-" },
    ],
    [
      { label: "2", val: profile.grid.digits[2] || "-" },
      { label: "5", val: profile.grid.digits[5] || "-" },
      { label: "8", val: profile.grid.digits[8] || "-" },
    ],
    [
      { label: "1", val: profile.grid.digits[1] || "-" },
      { label: "4", val: profile.grid.digits[4] || "-" },
      { label: "7", val: profile.grid.digits[7] || "-" },
    ],
  ];

  const planeLabels = [
    "Mind Plane (Thought)",
    "Soul Plane (Emotion)",
    "Physical Plane (Action)",
  ];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = gridMatrix[row][col];
      const cx = gridX + col * cellSize;
      const cy = gridY + row * cellSize;

      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.5);
      doc.rect(cx, cy, cellSize, cellSize);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.dark);
      doc.text(cell.val, cx + cellSize / 2, cy + cellSize / 2 + 3, {
        align: "center",
      });
    }

    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120, 120, 120);
    doc.text(
      planeLabels[row],
      gridX + 3 * cellSize + 8,
      gridY + row * cellSize + 13,
    );
  }

  y += 3 * cellSize + 12;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.dark);

  if (profile.energyBalance === "masculine") {
    doc.text(
      `Energy Balance: More masculine than feminine in energy (1s: ${profile.masculineCount}, 2s: ${profile.feminineCount})`,
      margin,
      y,
    );
    y += 6;
  } else if (profile.energyBalance === "feminine") {
    doc.text(
      `Energy Balance: More feminine than masculine in energy (2s: ${profile.feminineCount}, 1s: ${profile.masculineCount})`,
      margin,
      y,
    );
    y += 6;
  } else {
    doc.text(
      `Energy Balance: Equally balanced masculine and feminine energy (1s: ${profile.masculineCount}, 2s: ${profile.feminineCount})`,
      margin,
      y,
    );
    y += 6;
  }

  if (profile.oldSoul) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.secondary);
    doc.text(
      `Old Soul Indicator: Reincarnated ${profile.incarnationCount} times (5+ nines present)`,
      margin,
      y,
    );
    doc.setTextColor(...colors.dark);
    doc.setFont("helvetica", "normal");
    y += 6;
  } else {
    doc.text(
      `Times incarnated (Number 9 count): ${profile.incarnationCount}`,
      margin,
      y,
    );
    y += 6;
  }
  y += 8;

  // 5. Personality Number
  doc.addPage();
  y = 20;
  addSectionHeader(`Personality Number: ${profile.personality.formatted}`);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "How you present yourself to the world and your primary nature:",
    margin,
    y,
  );
  y += 7;

  const persKey = String(profile.personality.value);
  if (numbersDescription[persKey]) {
    const d = numbersDescription[persKey];
    addSubsection("Positive Traits:");
    y += addWrappedText(d["Good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Challenges & Areas for Caution:");
    y += addWrappedText(d["Not So good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Life Lessons:");
    y += addWrappedText(d["Lessons"], margin, y, maxWidth);
    y += 6;
  }

  // 6. Life Path Number
  checkPageBreak(50);
  addSectionHeader(`Life Path Number: ${profile.lifePath.formatted}`);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "What you are naturally gifted with and your life's central mission:",
    margin,
    y,
  );
  y += 7;

  const lpKey = String(profile.lifePath.value);
  if (numbersDescription[lpKey]) {
    const d = numbersDescription[lpKey];
    addSubsection("Positive Traits:");
    y += addWrappedText(d["Good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Challenges:");
    y += addWrappedText(d["Not So good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Life Lessons:");
    y += addWrappedText(d["Lessons"], margin, y, maxWidth);
    y += 4;
    addSubsection("Soul Desire Alignment:");
    y += addWrappedText(d["Soul Desire"], margin, y, maxWidth);
    y += 6;
  }

  // 7. Destiny Number
  checkPageBreak(50);
  addSectionHeader(`Destiny / Expression Number: ${profile.destiny.formatted}`);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "What you are destined to learn and achieve in this lifetime:",
    margin,
    y,
  );
  y += 7;

  const destKey = String(profile.destiny.value);
  if (numbersDescription[destKey]) {
    const d = numbersDescription[destKey];
    addSubsection("Positive Traits:");
    y += addWrappedText(d["Good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Destiny Lessons:");
    y += addWrappedText(d["Lessons"], margin, y, maxWidth);
    y += 6;
  }

  // 8. Soul Desire Number
  checkPageBreak(40);
  addSectionHeader(
    `Soul Desire Number (Vowels): ${profile.soulDesire.formatted}`,
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Your innermost heart's urge, deepest longings, and core motivation:",
    margin,
    y,
  );
  y += 7;

  const soulKey = String(profile.soulDesire.value);
  if (numbersDescription[soulKey]) {
    const d = numbersDescription[soulKey];
    addSubsection("Soul Longing:");
    y += addWrappedText(d["Soul Desire"], margin, y, maxWidth);
    y += 6;
  }

  // 9. Outer Personality Number
  checkPageBreak(40);
  addSectionHeader(
    `Outer Personality Number (Consonants): ${profile.outerPersonality.formatted}`,
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "The impression you leave on others and your social exterior:",
    margin,
    y,
  );
  y += 7;

  const outerKey = String(profile.outerPersonality.value);
  if (numbersDescription[outerKey]) {
    const d = numbersDescription[outerKey];
    addSubsection("Impression Traits:");
    y += addWrappedText(d["Good Description"], margin, y, maxWidth);
    y += 4;
    addSubsection("Challenges to Watch:");
    y += addWrappedText(d["Not So good Description"], margin, y, maxWidth);
    y += 6;
  }

  // 10. Repeated Numbers in Chart
  doc.addPage();
  y = 20;
  addSectionHeader("Present Numbers in Your Chart (Intensities)");
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Intensity effects based on how many times each digit appears:",
    margin,
    y,
  );
  y += 8;

  for (const item of profile.presentNumbers) {
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.secondary);
    const label = `Number ${item.digit} (appears ${item.count} time${
      item.count > 1 ? "s" : ""
    }):`;
    doc.text(label, margin, y);
    y += 6;
    doc.setTextColor(...colors.dark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y += addWrappedText(item.description, margin, y, maxWidth, 5);
    y += 5;
  }

  // 11. Missing Numbers (Karmic Lessons)
  if (profile.missingNumbers.length > 0) {
    checkPageBreak(45);
    addSectionHeader("Karmic Lessons (Missing Numbers)");
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Numbers absent from your chart highlighting spiritual growth areas:",
      margin,
      y,
    );
    y += 8;

    for (const item of profile.missingNumbers) {
      checkPageBreak(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...colors.secondary);
      doc.text(`Missing Number ${item.digit}:`, margin, y);
      y += 6;
      doc.setTextColor(...colors.dark);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      y += addWrappedText(item.description, margin, y, maxWidth, 5);
      y += 5;
    }
  }

  // 12. Personal Year
  checkPageBreak(35);
  addSectionHeader(
    `Personal Year ${profile.personalYear.formatted} (${profile.targetYear})`,
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    `The dominant vibrational themes and lessons for year ${profile.targetYear}:`,
    margin,
    y,
  );
  y += 8;

  const pyKey = String(profile.personalYear.value);
  if (numbersDescription[pyKey]) {
    const d = numbersDescription[pyKey];
    addSubsection("Focus & Life Lessons for this Year:");
    y += addWrappedText(d["Lessons"], margin, y, maxWidth);
  }

  // Clean filename
  const cleanName = profile.name.trim().replace(/[^a-zA-Z0-9_-]/g, "_") ||
    "Report";
  doc.save(`${cleanName}_Numerology_Report_${profile.birthDate.rawInput}.pdf`);
}
