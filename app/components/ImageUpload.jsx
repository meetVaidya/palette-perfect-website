'use client'

// import { useState, useCallback } from 'react';
// import { supabase } from '../lib/supabase';
// import '../styles/ImageUpload.css';

// export default function ImageUpload() {
//     const [imageUrl, setImageUrl] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [processing, setProcessing] = useState(false);
//     const [colorData, setColorData] = useState(null);
//     const [originalColorData, setOriginalColorData] = useState(null);

//     const handleImageUpload = async (event) => {
//         try {
//             setUploading(true);

//             const file = event.target.files[0];
//             const fileExt = file.name.split('.').pop();
//             const fileName = `${Math.random()}.${fileExt}`;
//             const filePath = `${fileName}`;

//             let { error: uploadError } = await supabase.storage
//                 .from('images')
//                 .upload(filePath, file);

//             if (uploadError) {
//                 throw uploadError;
//             }

//             const { data: { publicUrl }, error: urlError } = supabase.storage
//                 .from('images')
//                 .getPublicUrl(filePath);

//             if (urlError) {
//                 throw urlError;
//             }

//             setImageUrl(publicUrl);

//             setProcessing(true);
//             const response = await fetch('/api/process-image', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ imageUrl: publicUrl }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to process image');
//             }

//             const result = await response.json();
//             setColorData(result);
//             setOriginalColorData(result);
//         } catch (error) {
//             alert(error.message);
//         } finally {
//             setUploading(false);
//             setProcessing(false);
//         }
//     };

//     const handleColorChange = useCallback((type, color) => {
//         setColorData(prevData => ({
//             ...prevData,
//             [type]: color
//         }));
//     }, []);

//     const handleResetColors = useCallback(() => {
//         setColorData(originalColorData);
//     }, [originalColorData]);

//     return (
//         <div className="image-upload-container">
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 disabled={uploading || processing}
//                 className="file-input"
//             />
//             {uploading && <p className="status-message">Uploading...</p>}
//             {processing && <p className="status-message">Processing image...</p>}
//             {imageUrl && (
//                 <div className="image-preview">
//                     <p>Image uploaded successfully!</p>
//                     <img src={imageUrl} alt="Uploaded" />
//                 </div>
//             )}
//             {colorData && (
//                 <div className="color-analysis">
//                     <h2>Color Analysis:</h2>
//                     {['skin', 'hair', 'eye'].map((type) => (
//                         <div key={type} className="color-item">
//                             <label>{type} color:</label>
//                             <div className="color-input-group">
//                                 <input
//                                     type="color"
//                                     value={colorData[type]}
//                                     onChange={(e) => handleColorChange(type, e.target.value)}
//                                     className="color-input"
//                                 />
//                                 <span
//                                     className="color-preview"
//                                     style={{ backgroundColor: colorData[type] }}
//                                 ></span>
//                                 <span className="color-hex">{colorData[type]}</span>
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         onClick={handleResetColors}
//                         className="reset-button"
//                     >
//                         Reset Colors
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import '../styles/ImageUpload.css';

export default function ImageUpload() {
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [colorData, setColorData] = useState(null);
    const [originalColorData, setOriginalColorData] = useState(null);
    const [season, setSeason] = useState(null);
    const [fullAnalysis, setFullAnalysis] = useState(null);

    const handleImageUpload = async (event) => {
        try {
            setUploading(true);

            const file = event.target.files[0];
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
        <div className="image-upload-container">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading || processing}
                className="file-input"
            />
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