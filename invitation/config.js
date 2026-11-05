/* ============================================================
   بيانات الدعوة — عدّل هذا الملف فقط
   Wedding details — this is the only file you need to edit.
   Everything in [square brackets] is a placeholder.
   ============================================================ */

window.WEDDING = {
  /* ---------- العروسان | The couple ---------- */
  groom: {
    title: "[لقب العريس]",        // e.g. "م." or "د." — leave "" for none
    name: "[اسم العريس]",
    initial: "ع"                  // letter shown on the wax seal
  },
  bride: {
    title: "[لقب العروس]",
    name: "[اسم العروس]",
    initial: "ع"
  },

  /* ---------- الأسر الداعية | Host families ---------- */
  // One line per family group, as it should appear on the card.
  families: [
    "[آل والد العريس] و [آل والدة العريس]",
    "[آل والد العروس] و [آل والدة العروس]"
  ],

  /* ---------- الموعد | Date & time ---------- */
  // ISO format with Saudi offset (+03:00). Countdown, Hijri date and
  // calendar links are all generated from this one value.
  eventStart: "2027-01-14T20:00:00+03:00",   // [PLACEHOLDER DATE]
  durationHours: 4,
  // Optional: if the auto-calculated Hijri date is off by a day, write
  // the correct one here, e.g. "٥ شعبان ١٤٤٨ هـ". Leave "" for automatic.
  hijriOverride: "",

  /* ---------- المكان | Venue ---------- */
  venue: {
    name: "[اسم القاعة]",
    description: "[وصف قصير للقاعة — اختياري]",
    city: "[المدينة]",
    address: "[الحي — الشارع]",
    mapUrl: "https://maps.google.com/?q=[ضع رابط الموقع هنا]"
  },

  /* ---------- النصوص | Text ---------- */
  verse: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  verseRef: "سورة الروم — ٢١",

  intro: [
    "على بركة الله، وفي ليلةٍ نرجو أن تكون أولَ صفحةٍ في حكايةٍ طيّبة،",
    "يجمع الله قلبين على المودّة والرحمة، ويسعدنا أن تكونوا معنا ونحن نحتفل بهذه البداية."
  ],

  invitationLine: "بدعوتكم لحضور حفل زفاف نجليهما وتناول طعام العشاء",

  notes: [
    "[ملاحظة ١ — مثال: الحفل للبالغين فقط]",
    "[ملاحظة ٢ — مثال: يُرجى إبراز الدعوة عند الدخول]"
  ],

  closing: "حبابكم عشرة",               // Sudanese welcome
  closingSub: "وبحضوركم تكتمل فرحتنا",
  afterEvent: "تمّ الزفاف بحمد الله — بارك الله لهما وبارك عليهما وجمع بينهما في خير"
};
