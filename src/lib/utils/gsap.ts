import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(CustomEase);

const easeOut = CustomEase.create("easeOut", "M0,0 C0,0.7 0.3,1 1,1");
const easeInOut = CustomEase.create("easeInOut", "M0,0 C0.5,0 0.2,1 1,1");
const easings = { easeOut, easeInOut };

export { gsap, ScrollTrigger, SplitText, CustomEase, easings, easeOut, easeInOut };