import Header from "@layouts/Header";
import AfterHeader from "@layouts/AfterHeader";
import Features from "@layouts/Features";
import SupportUs from "@layouts/SupportUs";
import FooterFireflies from "@layouts/FooterFireflies";
import VoiceFeature from "@layouts/VoiceFeature";
import ImageFeature from "@layouts/ImageFeature";

export default function HomePage() {
  return (
    <>
      <Header />
      <AfterHeader />
      <Features />
      <VoiceFeature />
      <ImageFeature />
      <SupportUs />
      <FooterFireflies />
    </>
  );
}
