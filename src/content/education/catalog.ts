import type {
  EducationBook,
  EducationChapter,
  EducationClass,
  EducationSubject,
  VerifiedSource,
} from "@/types/education";

const cbseSource: VerifiedSource = {
  label: "CBSE Academic Curriculum 2026–27",
  url: "https://cbseacademic.nic.in/curriculum_2027.html",
  academicSession: "2026-27",
  verifiedAt: "2026-10-04",
};

const class9MathSource: VerifiedSource = {
  label: "CBSE Class IX Mathematics Curriculum 2026–27",
  url: "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1IX_2026-27.pdf",
  academicSession: "2026-27",
  verifiedAt: "2026-10-04",
};

export const educationClasses: EducationClass[] = [9, 10, 11, 12].map(
  (grade) => ({
    id: `class-${grade}`,
    slug: `class-${grade}` as EducationClass["slug"],
    grade: grade as EducationClass["grade"],
    title: { en: `Class ${grade}`, hi: `कक्षा ${grade}` },
    description: {
      en:
        grade < 11
          ? `Verified CBSE and NCERT learning guides for Class ${grade}.`
          : `Stream and subject-wise learning guides for Class ${grade}.`,
      hi:
        grade < 11
          ? `कक्षा ${grade} के लिए सत्यापित CBSE और NCERT अध्ययन सामग्री।`
          : `कक्षा ${grade} के लिए स्ट्रीम और विषय के अनुसार अध्ययन सामग्री।`,
    },
    status: "published",
    source: cbseSource,
  }),
);

const subject = (
  classId: string,
  slug: string,
  en: string,
  hi: string,
  order: number,
  streams?: EducationSubject["streams"],
): EducationSubject => ({
  id: `${classId}-${slug}`,
  classId,
  slug,
  title: { en, hi },
  description: {
    en: `${en} syllabus, chapter guides and original practice for ${classId.replace("-", " ")}.`,
    hi: `${classId.replace("class-", "कक्षा ")} के लिए ${hi} पाठ्यक्रम, अध्याय गाइड और मौलिक अभ्यास।`,
  },
  order,
  streams,
  status: "published",
  source:
    classId === "class-9" && slug === "mathematics"
      ? class9MathSource
      : cbseSource,
});

export const educationSubjects: EducationSubject[] = [
  subject("class-9", "english", "English", "अंग्रेज़ी", 1),
  subject("class-9", "hindi", "Hindi", "हिंदी", 2),
  subject("class-9", "mathematics", "Mathematics", "गणित", 3),
  subject("class-9", "science", "Science", "विज्ञान", 4),
  subject("class-9", "social-science", "Social Science", "सामाजिक विज्ञान", 5),
  subject(
    "class-9",
    "computer-applications",
    "Computer Applications",
    "कंप्यूटर अनुप्रयोग",
    6,
  ),
  subject("class-10", "english", "English", "अंग्रेज़ी", 1),
  subject("class-10", "hindi", "Hindi", "हिंदी", 2),
  subject("class-10", "mathematics", "Mathematics", "गणित", 3),
  subject("class-10", "science", "Science", "विज्ञान", 4),
  subject("class-10", "social-science", "Social Science", "सामाजिक विज्ञान", 5),
  subject(
    "class-10",
    "computer-applications",
    "Computer Applications",
    "कंप्यूटर अनुप्रयोग",
    6,
  ),
  subject("class-11", "english-core", "English Core", "अंग्रेज़ी कोर", 1, [
    "science",
    "commerce",
    "humanities",
  ]),
  subject("class-11", "physics", "Physics", "भौतिक विज्ञान", 2, ["science"]),
  subject("class-11", "chemistry", "Chemistry", "रसायन विज्ञान", 3, [
    "science",
  ]),
  subject("class-11", "mathematics", "Mathematics", "गणित", 4, [
    "science",
    "commerce",
  ]),
  subject("class-11", "biology", "Biology", "जीव विज्ञान", 5, ["science"]),
  subject(
    "class-11",
    "computer-science",
    "Computer Science",
    "कंप्यूटर विज्ञान",
    6,
    ["science"],
  ),
  subject("class-11", "accountancy", "Accountancy", "लेखाशास्त्र", 7, [
    "commerce",
  ]),
  subject(
    "class-11",
    "business-studies",
    "Business Studies",
    "व्यवसाय अध्ययन",
    8,
    ["commerce"],
  ),
  subject("class-11", "economics", "Economics", "अर्थशास्त्र", 9, [
    "commerce",
    "humanities",
  ]),
  subject("class-11", "history", "History", "इतिहास", 10, ["humanities"]),
  subject("class-11", "geography", "Geography", "भूगोल", 11, ["humanities"]),
  subject(
    "class-11",
    "political-science",
    "Political Science",
    "राजनीति विज्ञान",
    12,
    ["humanities"],
  ),
  subject("class-12", "english-core", "English Core", "अंग्रेज़ी कोर", 1, [
    "science",
    "commerce",
    "humanities",
  ]),
  subject("class-12", "physics", "Physics", "भौतिक विज्ञान", 2, ["science"]),
  subject("class-12", "chemistry", "Chemistry", "रसायन विज्ञान", 3, [
    "science",
  ]),
  subject("class-12", "mathematics", "Mathematics", "गणित", 4, [
    "science",
    "commerce",
  ]),
  subject("class-12", "biology", "Biology", "जीव विज्ञान", 5, ["science"]),
  subject(
    "class-12",
    "computer-science",
    "Computer Science",
    "कंप्यूटर विज्ञान",
    6,
    ["science"],
  ),
  subject("class-12", "accountancy", "Accountancy", "लेखाशास्त्र", 7, [
    "commerce",
  ]),
  subject(
    "class-12",
    "business-studies",
    "Business Studies",
    "व्यवसाय अध्ययन",
    8,
    ["commerce"],
  ),
  subject("class-12", "economics", "Economics", "अर्थशास्त्र", 9, [
    "commerce",
    "humanities",
  ]),
  subject("class-12", "history", "History", "इतिहास", 10, ["humanities"]),
  subject("class-12", "geography", "Geography", "भूगोल", 11, ["humanities"]),
  subject(
    "class-12",
    "political-science",
    "Political Science",
    "राजनीति विज्ञान",
    12,
    ["humanities"],
  ),
];

export const educationBooks: EducationBook[] = [
  {
    id: "class-9-mathematics-2026-27",
    slug: "mathematics-2026-27",
    subjectId: "class-9-mathematics",
    title: { en: "Class 9 Mathematics 2026–27", hi: "कक्षा 9 गणित 2026–27" },
    description: {
      en: "Chapter-wise guides aligned with the official CBSE Class IX Mathematics curriculum.",
      hi: "आधिकारिक CBSE कक्षा 9 गणित पाठ्यक्रम के अनुसार अध्यायवार आसान गाइड।",
    },
    status: "published",
    source: class9MathSource,
  },
];

const chapterNames: Array<[string, string, string]> = [
  ["number-system", "Number System", "संख्या पद्धति"],
  [
    "introduction-to-polynomials",
    "Introduction to Polynomials",
    "बहुपद का परिचय",
  ],
  [
    "sequences-and-progressions",
    "Sequences and Progressions",
    "अनुक्रम और श्रेणियाँ",
  ],
  [
    "exploring-algebraic-identities",
    "Exploring Algebraic Identities",
    "बीजीय सर्वसमिकाओं की खोज",
  ],
  [
    "linear-equations-in-two-variables",
    "Linear Equations in Two Variables",
    "दो चरों वाले रैखिक समीकरण",
  ],
  ["coordinate-geometry", "Coordinate Geometry", "निर्देशांक ज्यामिति"],
  [
    "introduction-to-euclids-geometry",
    "Introduction to Euclid's Geometry",
    "यूक्लिड की ज्यामिति का परिचय",
  ],
  ["lines-and-angles", "Lines and Angles", "रेखाएँ और कोण"],
  [
    "triangles-congruence-theorems",
    "Triangles – Congruence Theorems",
    "त्रिभुज – सर्वांगसमता प्रमेय",
  ],
  ["quadrilaterals", "Quadrilaterals", "चतुर्भुज"],
  ["circles", "Circles", "वृत्त"],
  ["area-and-perimeter", "Area and Perimeter", "क्षेत्रफल और परिमाप"],
  [
    "surface-area-and-volume",
    "Surface Area and Volume",
    "पृष्ठीय क्षेत्रफल और आयतन",
  ],
  [
    "statistics-and-probability",
    "Statistics and Probability",
    "सांख्यिकी और प्रायिकता",
  ],
];

export const educationChapters: EducationChapter[] = chapterNames.map(
  ([slug, en, hi], index) => ({
    id: `class-9-math-${slug}`,
    slug,
    bookId: "class-9-mathematics-2026-27",
    order: index + 1,
    title: { en, hi },
    status: index < 2 ? "published" : "planned",
    source: class9MathSource,
  }),
);
