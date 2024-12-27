import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableMachine = () => {
    const webcamRef = useRef(null);
    const [labelContainer, setLabelContainer] = useState([]);
    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);

    const URL = './my_model/'; // Path to your model

    // Load the model and setup the webcam
    const init = async () => {
        const modelURL = `${URL}model.json`;
        const metadataURL = `${URL}metadata.json`;

        // Load the model and metadata
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        // Setup webcam
        const webcam = new tmImage.Webcam(200, 200, true); // width, height, flip
        await webcam.setup();
        await webcam.play();
        webcamRef.current = webcam;

        window.requestAnimationFrame(() => loop(webcam));
    };

    const loop = async (webcam) => {
        webcam.update(); // Update webcam frame
        await predict(webcam);
        window.requestAnimationFrame(() => loop(webcam));
    };

    // Run the webcam image through the image model
    const predict = async (webcam) => {
        if (model) {
            const predictions = await model.predict(webcam.canvas);
            console.log(predictions)
            // Map predictions to objects with className and binary detection status
            const labels = predictions.map((p) => ({
                className: p.className,
                detected: p.probability > 0.5, // Detected if probability exceeds threshold
                probability: parseFloat(p.probability.toFixed(2)),
            }));

            setLabelContainer(labels);
        }
    };

    useEffect(() => {
        init();

        return () => {
            if (webcamRef.current) webcamRef.current.stop(); // Clean up webcam
        };
    }, []);

    return (
        <div>
            <h1>Teachable Machine Image Model</h1>
            <button onClick={init}>Start</button>
            <div
                id="webcam-container"
                style={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                }}
            >
                {webcamRef.current && (
                    <canvas
                        ref={(el) => (webcamRef.current.canvas = el)}
                        style={{
                            height: '100%',
                            position: 'relative',
                        }}
                    />
                )}
            </div>
            <div id="label-container">
                {labelContainer.map((label, index) => (
                    <div key={index}>
                        {label.className}: {label.detected ? "Detected" : "Not Detected"} ({label.probability})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeachableMachine;

