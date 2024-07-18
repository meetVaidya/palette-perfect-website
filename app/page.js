import ImageUpload from '../app/components/ImageUpload';

export default function Home() {
    return (
        <main style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                Image Upload and Color Analysis
            </h1>
            <ImageUpload />
        </main>
    );
}