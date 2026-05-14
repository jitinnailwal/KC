import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import type { ServicePageData } from '@/components/services/ServicePageTemplate';

const data: ServicePageData = {
  badge: 'WhatsApp Marketing',
  headline: 'Stop Sending Messages',
  headlineGradient: 'That Get Ignored',
  heroDescription: "Want your business to actually get replies, not just seen ticks? We help you turn WhatsApp into a serious revenue channel. Real conversations. Real leads. Real sales. No spam, no guesswork.",
  whatIsTitle: 'What Is WhatsApp Marketing?',
  whatIsContent: [
    "WhatsApp marketing focuses on reaching the right audience with the right message at the right time. Instead of competing for attention on algorithm-driven platforms, you leverage a channel where user attention already exists.",
    "From lead follow-ups to promotional campaigns, customer service to repeat purchases — WhatsApp is the direct communication channel your business needs.",
  ],
  whyNeededTitle: 'Why Does WhatsApp Work?',
  whyNeededContent: [
    "WhatsApp achieves extraordinary engagement because people actively use it every day. It delivers faster response times than any other channel, helping you build trust and close deals quickly.",
    "With a 98% open rate — far higher than email — WhatsApp ensures your messages actually get read. The personal, conversational nature of the platform drives higher engagement and sales.",
  ],
  services: [
    { title: 'Lead Nurturing', description: "Someone showed interest but didn't convert? We don't let that lead go cold. Natural, non-intrusive follow-ups that guide conversations toward conversion." },
    { title: 'Broadcast Campaigns', description: "Targeted message distribution that avoids spam. Audience segmentation ensures every message is relevant to the recipient." },
    { title: 'Automation Setup', description: "Systems that keep your business responsive 24/7 — auto-responses, quick replies, and intelligent conversation flows." },
    { title: 'Customer Support', description: "Structured response systems that deliver rapid, professional customer service experiences through WhatsApp." },
    { title: 'Retargeting', description: "Reconnection strategies for site visitors and inquiries that didn't convert. Bring them back through personalized WhatsApp outreach." },
    { title: 'Performance Analytics', description: "Track reply rates, conversion rates, and campaign performance to continuously optimize your WhatsApp strategy." },
  ],
  whyChoose: [
    { title: 'Real Replies', subtitle: '"Not Just Delivery Metrics"', description: "We focus on actual replies and conversations, not just message delivery stats. Real engagement that drives real business results." },
    { title: 'Purposeful Messaging', subtitle: '"No Trust Erosion"', description: "Every message has a purpose. We avoid spammy tactics that erode trust and instead build genuine connections with your audience." },
    { title: 'Trust-Building', subtitle: '"Conversations, Not Scripts"', description: "Our approach creates authentic conversations that feel natural, building trust and rapport that leads to conversions." },
  ],
  support: [
    { title: 'Real-Time Assistance', description: "Direct response to operational issues, campaign adjustments, and urgent WhatsApp marketing needs." },
    { title: 'Proactive Monitoring', description: "Continuous performance analysis with preventive adjustments to keep your campaigns running optimally." },
    { title: 'Strategic Guidance', description: "Campaign planning aligned with your business objectives. We help you build a WhatsApp strategy that scales." },
  ],
  caseStudy: {
    title: 'From Ignored to Engaged',
    challenge: "A growing brand had poor WhatsApp engagement — low reply rates, generic messaging, and no systematic follow-up process for leads.",
    result: "Restructured audience segmentation, optimized timing, and enhanced message sequencing resulted in dramatically improved reply rates, customer retention, and direct sales conversions.",
    highlight: 'Significant Increase in Reply Rates',
  },
  tactics: ['Audience Segmentation', 'Message Sequencing', 'Automation Flows', 'Broadcast Campaigns', 'Lead Nurturing', 'Retargeting', 'A/B Testing', 'Analytics'],
  ctaTitle: "Ready to Turn Chats Into Customers?",
  ctaDescription: "Let's make your WhatsApp work like a real sales channel — smart conversations, faster responses, and systems built to bring more leads.",
};

export default function WhatsAppMarketingPage() {
  return <ServicePageTemplate data={data} />;
}
