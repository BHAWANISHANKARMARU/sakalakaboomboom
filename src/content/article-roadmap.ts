type Section = "education" | "exams" | "technology" | "how-to" | "india-guides";
export type PlannedArticle = {
  id: string;
  slug: string;
  locale: "en";
  section: Section;
  title: string;
  description: string;
  audience: string[];
  searchIntent: string;
  headings: string[];
  examples: string[];
  relatedToolIds: string[];
  internalLinks: string[];
  freshness: "evergreen" | "verify-annually" | "time-sensitive";
  officialSources: string[];
  status: "planned";
};
const groups: Record<Section, string[]> = {
  education: [
    "How to Study NCERT Textbooks Effectively",
    "Class 11 Maths Study Plan for the School Year",
    "Class 11 Physics: How to Build Strong Fundamentals",
    "Class 11 Chemistry Study Strategy",
    "Important Study Habits for Class 11 Students",
    "How to Make NCERT Chapter Notes",
    "How to Read NCERT Science Diagrams",
    "Class 12 Maths Board Exam Preparation Plan",
    "Class 12 Physics Board Exam Preparation Plan",
    "Class 12 Chemistry Board Exam Preparation Plan",
    "How to Prepare for CBSE Practical Exams",
    "How to Write Better Answers in CBSE Board Exams",
    "How to Create a Class 12 Revision Timetable",
    "NCERT Exemplar: When and How to Use It",
    "How to Revise Long NCERT Chapters",
    "Common Mistakes Students Make While Using NCERT",
    "How to Balance Boards and Entrance Exam Preparation",
    "How to Analyse a CBSE Sample Paper",
    "How to Prepare a Formula Sheet for Maths and Physics",
    "How to Study Organic Chemistry from NCERT",
    "How to Practise Physics Numericals Effectively",
    "How to Prepare Chemistry Reactions for Board Exams",
    "How to Use Previous-Year Questions Responsibly",
    "One-Month Board Exam Revision Framework",
    "How to Check the Current CBSE Syllabus from Official Sources",
  ],
  exams: [
    "How to Start Preparing for SSC Exams",
    "SSC Quantitative Aptitude Study Framework",
    "SSC English Preparation for Beginners",
    "Banking Exam Reasoning Preparation Guide",
    "Banking Exam Quantitative Aptitude Study Plan",
    "How to Improve Speed for Competitive Exam Mock Tests",
    "How to Analyse Mock Test Mistakes",
    "Railway Exam Preparation Framework for Beginners",
    "CUET Preparation: Building a Subject-Wise Plan",
    "How to Read an Official Exam Notification",
    "How to Verify Exam Dates and Admit Card Notices",
    "How to Check Eligibility Without Relying on Rumours",
    "Daily Current Affairs Revision System for Exams",
    "How to Make Short Notes for Competitive Exams",
    "How to Balance College and Competitive Exam Preparation",
    "A Practical Weekly Revision Cycle for Aspirants",
    "How to Avoid Negative Marking Mistakes",
    "How to Choose Mock Tests for Your Exam",
    "What to Carry to an Indian Competitive Exam Centre",
    "How to Track Multiple Exam Applications Safely",
  ],
  technology: [
    "What Happens When You Open a Website",
    "HTTP and HTTPS Explained Simply",
    "How Browser Cookies Work",
    "How to Recognise a Phishing Website",
    "Two-Factor Authentication Explained",
    "How Password Managers Protect Your Accounts",
    "What Metadata Can a Website Reveal",
    "How QR Codes Store Information",
    "JPG PNG and WebP: Which Format to Use",
    "How PDF Compression Changes a Document",
    "What Browser-Based File Processing Means",
    "How to Check Whether a Website Connection Is Secure",
    "How URL Encoding Works",
    "JSON Explained for Beginners",
    "What a Website Screenshot Can and Cannot Prove",
    "How to Clear Browser Data Without Losing Everything",
    "Public Wi-Fi Safety Checklist",
    "How Cloud Storage Sharing Links Work",
    "How to Check File Types Before Opening Downloads",
    "Digital Privacy Basics for Indian Internet Users",
  ],
  "how-to": [
    "How to Merge PDF Files in the Correct Order",
    "How to Reduce Image Size for an Online Form",
    "How to Count Words in an Assignment",
    "How to Validate JSON Before Using It",
    "How to Create a QR Code for a URL",
    "How to Compress a Photograph Without Making It Blurry",
    "How to Choose the Right Image Dimensions",
    "How to Convert JPG and PNG Without Confusion",
    "How to Remove Duplicate Lines from a List",
    "How to Change Text Between Uppercase and Lowercase",
    "How to Encode and Decode a URL",
    "How to Extract Selected Pages from a PDF",
    "How to Turn Multiple Photos into One PDF",
    "How to Split a Large PDF into Smaller Files",
    "How to Prepare Documents for an Online Application",
    "How to Scan a QR Code from an Existing Image",
    "How to Check a Webpage Title and Description",
    "How to Save a Clean Website Screenshot",
    "How to Name Files Before Uploading Them",
    "How to Troubleshoot a File Upload Error",
  ],
  "india-guides": [
    "How to Keep Digital Copies of Important Indian Documents",
    "How to Prepare a Photo for an Indian Online Application",
    "How to Verify an Official Government Website",
    "How to Use DigiLocker Safely",
    "How to Protect Aadhaar Information Online",
    "How to Spot Fake Government Scheme Messages",
    "How to Check a UPI Payment Request Safely",
    "How to Organise Education Certificates Digitally",
    "How to Create Strong Passwords for Government Portals",
    "How to Use Public Computers More Safely",
    "How to Check Whether an SMS Link Is Genuine",
    "How to Prepare Scanned Documents for Scholarship Forms",
    "How to Keep Application Receipts and Reference Numbers",
    "How to Verify Helpline and Contact Information",
    "A Digital Safety Checklist for First-Time Internet Users",
  ],
};
const toolBySection: Record<Section, string[]> = {
  education: ["word-counter"],
  exams: ["word-counter"],
  technology: ["json-formatter"],
  "how-to": ["pdf-merger", "image-compressor"],
  "india-guides": ["image-compressor", "pdf-merger"],
};
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const articleRoadmap: PlannedArticle[] = Object.entries(groups).flatMap(
  ([section, titles]) =>
    titles.map((title, index) => ({
      id: `${section}-${index + 1}`,
      slug: slugify(title),
      locale: "en",
      section: section as Section,
      title,
      description: `A practical, India-focused guide to ${title.toLowerCase()}.`,
      audience:
        section === "education"
          ? ["Indian students", "Parents"]
          : ["Indian internet users"],
      searchIntent: `Help readers understand and complete the task described by “${title}” with clear, trustworthy steps.`,
      headings: [
        "What you need to know",
        "Step-by-step approach",
        "Common mistakes and checks",
      ],
      examples: ["A realistic Indian user scenario"],
      relatedToolIds: toolBySection[section as Section],
      internalLinks: [`/${section}`],
      freshness:
        section === "exams" ||
        title.includes("Current") ||
        title.includes("Official")
          ? "time-sensitive"
          : "evergreen",
      officialSources:
        section === "education"
          ? ["CBSE or NCERT official website when current facts are included"]
          : section === "exams"
            ? ["The responsible examination authority's official notification"]
            : title.includes("Government") ||
                title.includes("Aadhaar") ||
                title.includes("DigiLocker")
              ? ["Relevant official Government of India service website"]
              : [],
      status: "planned" as const,
    })),
);
