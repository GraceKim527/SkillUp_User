// src/components/common/NaverMap/index.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

interface NaverMapProps {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
}

let sdkLoadPromise: Promise<void> | null = null;

function loadNaverMapsSdk(): Promise<void> {
  if (window.naver?.maps) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

export default function NaverMap({
  latitude,
  longitude,
  width = "100%",
  height = "300px",
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    loadNaverMapsSdk().then(() => setSdkReady(true));
  }, []);

  useEffect(() => {
    if (!sdkReady || !mapRef.current) return;

    // 전달받은 위도/경도 사용
    const position = new window.naver.maps.LatLng(latitude, longitude);

    // 지도 생성
    const map = new window.naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    });

    // 마커 생성
    new window.naver.maps.Marker({
      position: position,
      map: map,
    });

    // cleanup
    return () => {
      map.destroy();
    };
  }, [sdkReady, latitude, longitude]);

  return (
    <div
      ref={mapRef}
      className={styles.mapContainer}
      style={{ width, height }}
    />
  );
}
