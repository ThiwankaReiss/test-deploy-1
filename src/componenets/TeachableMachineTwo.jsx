import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
// import Sorter from './Sorters/Sorter';
import ARModel from '../canvas/ARModel';

const TeachableMachineTwo = () => {



    const webcamRef = useRef(null);
    const [labelContainer, setLabelContainer] = useState([]);
    const [model, setModel] = useState(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [locationContainer,setLocationContainer]=useState([])


    const URL = './my_model_two/'; // Path to your model

    const GRID_SIZE = 2; // Define a 10x10 grid

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


    // Divide canvas into a grid and predict on each section
    const predict = async (webcam) => {

        if (model) {
            const { canvas } = webcam;
            const sectionWidth = canvas.width / GRID_SIZE;
            const sectionHeight = canvas.height / GRID_SIZE;
            const locations = [];

            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    const x = col * sectionWidth;
                    const y = row * sectionHeight;

                    // Create a temporary canvas for each section
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = sectionWidth;
                    tempCanvas.height = sectionHeight;
                    const ctx = tempCanvas.getContext('2d');
                    ctx.drawImage(canvas, x, y, sectionWidth, sectionHeight, 0, 0, sectionWidth, sectionHeight);

                    // Run prediction on the section
                    const predictions = await model.predict(tempCanvas);
                    setLabelContainer(predictions)
                    predictions.forEach((p) => {
                        // console.log(p.probability)
                        if (p.probability >= 0.97) {
                            // If detected, calculate the trapezium coordinates
                            const topLeft = [col, row];
                            const topRight = [col + 1, row];
                            const bottomRight = [col + 1, row + 1];
                            const bottomLeft = [col, row + 1];
                            locations.push({
                                className: p.className,
                                probability: p.probability,
                                coordinates: [topLeft, topRight, bottomRight, bottomLeft]
                            });
                        }
                    });
                    if (locations.length > 0) {
                        // console.log('Detected locations:', locations);
                        setLocationContainer(locations)
                    }
                    // if (locations.length > 0) {


                    //     var min_x = locations[0].coordinates[0][0]
                    //     var max_x = locations[0].coordinates[0][0]
                    //     var min_y = locations[0].coordinates[0][1]
                    //     var max_y = locations[0].coordinates[0][1]

                    //     locations.forEach((loca) => {
                    //         loca.coordinates.forEach((cordi) => {
                    //             if (cordi[0] < min_x) {
                    //                 min_x = cordi[0]
                    //             }
                    //             if (cordi[0] > max_x) {
                    //                 max_x = cordi[0]
                    //             }
                    //             if (cordi[1] < min_y) {
                    //                 min_y = cordi[1]
                    //             }
                    //             if (cordi[1] > max_y) {
                    //                 max_y = cordi[1]
                    //             }
                    //         })
                    //     })
                    //     console.log([[min_x, min_y], [max_x, min_y], [min_x, max_y], [max_x, max_y]])

                    // }

                }
            }



            // console.log('Detected locations:', locations);
            setLabelContainer(locations);
        }

    };

    useEffect(() => {
        init();

        return () => {
            if (webcamRef.current) webcamRef.current.stop(); // Clean up webcam
        };
    }, []);

    return (
        <>
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
                <div>
                    {/* <ARModel></ARModel> */}

                </div>
                <div id="label-container">
                    {labelContainer.map((label, index) => (
                        <div key={index}>
                            {label.className}: {label.detected ? "Detected" : "Not Detected"} ({label.probability})
                        </div>
                    ))}
                </div>
                <div >
                    {locationContainer.map((label, index) => (
                        <div key={index}>
                            {label.className}: ({label.probability})
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default TeachableMachineTwo;
