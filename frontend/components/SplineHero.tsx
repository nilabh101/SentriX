"use client";
import React, { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function SplineHero() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden">
            <Suspense fallback={
                <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-4" />
                    </div>
                </div>
            }>
                <div className="scale-125 md:scale-100 opacity-60">
                    <Spline
                        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                        className="w-full h-screen"
                    />
                </div>
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10 pointer-events-none" />
        </div>
    );
}
