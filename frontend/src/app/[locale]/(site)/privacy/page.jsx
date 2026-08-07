import { makeLegalPage } from "@/lib/legalPage";

const { generateMetadata, Page } = makeLegalPage("privacy");
export { generateMetadata };
export default Page;
