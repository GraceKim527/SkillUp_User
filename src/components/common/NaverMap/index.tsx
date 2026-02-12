// src/components/common/NaverMap/index.tsx
"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface NaverMapProps {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
}

export default function NaverMap({
  latitude,
  longitude,
  width = "100%",
  height = "300px",
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 네이버 지도 SDK가 로드되지 않았으면 대기
    if (!window.naver || !window.naver.maps) {
      console.warn("Naver Maps SDK not loaded yet");
      return;
    }

    if (!mapRef.current) return;

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
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      className={styles.mapContainer}
      style={{ width, height }}
    />
  );
}
