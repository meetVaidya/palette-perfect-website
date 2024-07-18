'use client'

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/ImageUpload.css';
import '../components/Button.css';

export default function ImageUpload() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [colorData, setColorData] = useState(null);
    const [originalColorData, setOriginalColorData] = useState(null);
    const [season, setSeason] = useState(null);
    const [fullAnalysis, setFullAnalysis] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleImageUpload = async () => {
        if (!file) return;
        try {
            setUploading(true);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl }, error: urlError } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            if (urlError) {
                throw urlError;
            }

            setImageUrl(publicUrl);

            setProcessing(true);
            const response = await fetch('/api/process-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: publicUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to process image');
            }

            const result = await response.json();
            setColorData(result);
            setOriginalColorData(result);
            setSeason(result.season);
            setFullAnalysis(result.fullAnalysis);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
            setProcessing(false);
        }
    };

    const handleColorChange = useCallback((type, color) => {
        setColorData(prevData => ({
            ...prevData,
            [type]: color
        }));
    }, []);

    const handleResetColors = useCallback(() => {
        setColorData(originalColorData);
    }, [originalColorData]);

    return (
        <div className="pt-16 px-32">
            <div
                className="border-4 border-solid border-[#ffab70] rounded-lg p-52 text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <p>Drag and drop a file here, or click to select a file</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer text-blue-500">
                    Select a file
                </label>
            </div>

            {file && (
                <div className="mt-4 ml-10">
                    <p>Selected file: {file.name}</p>
                    <button className="Button" onClick={handleImageUpload} disabled={uploading}>
                        <span className="Button__inner">{uploading ? 'Uploading...' : 'Upload'}</span>
                    </button>
                </div>
            )}

            {uploading && <p className="status-message">Uploading...</p>}
            {processing && <p className="status-message">Processing image...</p>}
            {imageUrl && (
                <div className="image-preview">
                    <p>Image uploaded successfully!</p>
                    <img src={imageUrl} alt="Uploaded" />
                </div>
            )}
            {colorData && (
                <div className="color-analysis">
                    <h2>Color Analysis:</h2>
                    {['skin', 'hair', 'eye'].map((type) => (
                        <div key={type} className="color-item">
                            <label>{type} color:</label>
                            <div className="color-input-group">
                                <input
                                    type="color"
                                    value={colorData[type]}
                                    onChange={(e) => handleColorChange(type, e.target.value)}
                                    className="color-input"
                                />
                                <span
                                    className="color-preview"
                                    style={{ backgroundColor: colorData[type] }}
                                ></span>
                                <span className="color-hex">{colorData[type]}</span>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleResetColors} className="reset-button">
                        Reset Colors
                    </button>
                    {season && (
                        <div className="season-result">
                            <h3>Your Color Season:</h3>
                            <p>{season}</p>
                        </div>
                    )}
                    {fullAnalysis && (
                        <div className="full-analysis">
                            <h3>Full Analysis:</h3>
                            <p dangerouslySetInnerHTML={{ __html: fullAnalysis }}></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
