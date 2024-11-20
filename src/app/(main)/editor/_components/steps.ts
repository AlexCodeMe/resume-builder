import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./form/general-info-form";
import PersonalInfoForm from "./form/personal-info-form";
import WorkExperienceForm from "./form/work-experience-form";
import EducationForm from "./form/education-form";
import SkillsForm from "./form/skills-form";
import SummaryForm from "./form/summary-form";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General Info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experiences",
    component: WorkExperienceForm,
    key: "work-experiences",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
