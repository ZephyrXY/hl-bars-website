// global.d.ts
declare module "@/app/ui/global.css" {
  const content: unknown;
  export default content;
}

// Also accept generic css imports across the project
declare module "*.css";
