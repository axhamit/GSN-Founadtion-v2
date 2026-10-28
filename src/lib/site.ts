export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.gsnfoundation.com").replace(/\/$/, "");
export const SITE_NAME = "GSN Foundation";
export const SIGNIN_URL = process.env.NEXT_PUBLIC_SIGNIN_URL || "/sign-in";
export const SIGNUP_URL = process.env.NEXT_PUBLIC_SIGNUP_URL || "/sign-up";

export const CONTACT = {
  email: "contact@gsnfoundation.com",
  people: [
    { name: "Vijay Kumar N", phone: "+91 8217591455" },
    { name: "Srikanth Patil", phone: "+91 9480287005" },
  ],
};

// Figures copied from the current live site. Verify them before publishing.
export const STATS = [
  { value: "50+", label: "Expert faculty" },
  { value: "10K+", label: "Students trained" },
  { value: "Online + Offline", label: "Class formats" },
];

export const INDEX_PROPOSED = process.env.INDEX_PROPOSED_COURSES === "true";
