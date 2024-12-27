import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Sofa = ({  imgArray, geos }) => {
    const { nodes, materials } = useGLTF('/sofa_baked.glb');

    // const textures = {
    //     Pillow: null,
    //     Seat: null,
    //     Frame: null,
    // };

    // const colors = {
    //     Pillow: null,
    //     Seat: null,
    //     Frame: null,
    // };

    // Helper function to set texture properties
    // const setTextureProperties = (type, index) => {
    //     const texture = useTexture(imgArray[index].image);
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(geos[index].repeate, geos[index].repeate);
    //     texture.flipY = false;
    //     return texture;
    // };

    // if (imgArray) {
    //     imgArray.forEach((img, index) => {
    //         if (img.image) {
    //             if (img.type === 'Pillow') {
    //                 textures.Pillow = setTextureProperties('Pillow', index);
    //             } else if (img.type === 'Seat') {
    //                 textures.Seat = setTextureProperties('Seat', index);
    //             } else if (img.type === 'Frame') {
    //                 textures.Frame = setTextureProperties('Frame', index);
    //             }
    //         }
    //     });
    // }

    // if (geos) {
    //     geos.forEach((geo) => {
    //         if (geo.color) {
    //             if (geo.name === 'Pillow') {
    //                 colors.Pillow = geo.color;
    //             } else if (geo.name === 'Seat') {
    //                 colors.Seat = geo.color;
    //             } else if (geo.name === 'Frame') {
    //                 colors.Frame = geo.color;
    //             }
    //         }
    //     });
    // }

    const renderMaterial = (type, baseMaterial, color, texture) => {
       
            if (color) {
                return (
                    <meshStandardMaterial
                        color={color}
                        roughness={baseMaterial.roughness}
                        metalness={baseMaterial.metalness}
                        normalMap={baseMaterial.normalMap}
                        aoMap={baseMaterial.aoMap}
                        emissive={baseMaterial.emissive}
                        opacity={1.0}
                        depthTest={true}
                        depthWrite={true}
                    />
                );
            } else if (texture) {
                return (
                    <meshStandardMaterial
                        map={texture}
                        transparent
                        roughness={baseMaterial.roughness}
                        metalness={baseMaterial.metalness}
                        normalMap={baseMaterial.normalMap}
                        aoMap={baseMaterial.aoMap}
                        emissive={baseMaterial.emissive}
                        opacity={1.0}
                        depthTest={true}
                        depthWrite={true}
                    />
                );
            }
  
        return null;
    };

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.frame.geometry}
                material={materials.FrameMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {/* {renderMaterial('Frame', materials.FrameMaterial, colors.Frame, null)} */}
            </mesh>
            {/* <mesh
                castShadow
                geometry={nodes.frameCloth.geometry}
                material={materials.FrameClothMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {renderMaterial('Frame', materials.FrameClothMaterial, null, textures.Frame)}
            </mesh> */}
            <mesh
                castShadow
                geometry={nodes.holders.geometry}
                material={materials.HolderMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            />
            <mesh
                castShadow
                geometry={nodes.seats.geometry}
                material={materials.SeatsMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {/* {renderMaterial('Seat', materials.SeatsMaterial, colors.Seat, null)} */}
            </mesh>
            {/* <mesh
                castShadow
                geometry={nodes.seatsCloth.geometry}
                material={materials.SeatsClothMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {renderMaterial('Seat', materials.SeatsClothMaterial, null, textures.Seat)}
            </mesh> */}
            <mesh
                castShadow
                geometry={nodes.pillows.geometry}
                material={materials.PillowsMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {/* {renderMaterial('Pillow', materials.PillowsMaterial, colors.Pillow, null)} */}
            </mesh>
            {/* <mesh
                castShadow
                geometry={nodes.pillowsCloth.geometry}
                material={materials.PillowsClothMaterial}
                dispose={null}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                scale={[5, 5, 5]}
            >
                {renderMaterial('Pillow', materials.PillowsClothMaterial, null, textures.Pillow)}
            </mesh> */}
        </group>
    );
};

export default Sofa;
