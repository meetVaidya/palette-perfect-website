import ImageUpload from './components/ImageUpload';
import styles from "./page.module.css";
import HeroSection from "./components/HeroSection";

export default function Home() {
    return (
        <main style={{ padding: '20px' }}>
            <HeroSection />
            <ImageUpload />
        </main >
    );
}