import { useState, useEffect, useRef, useCallback } from 'react';
import { initialPressureNodes } from '../data/mockData';

/**
 * useLiveData — simulates live sensor data with setInterval updates.
 * Updates every 5 seconds:
 * - Pressure values fluctuate ±0.02 MPa
 * - Battery drains slowly (0.1% per tick)
 * - Flow rate varies ±1 L/min
 * - Timestamps update
 * - Stale data detection (>30 min)
 */
const useLiveData = () => {
  const [pressureNodes, setPressureNodes] = useState(() => ({
    p1: { ...initialPressureNodes.p1 },
    p2: { ...initialPressureNodes.p2 },
    p3: { ...initialPressureNodes.p3 },
  }));

  const [battery, setBattery] = useState(78);
  const [gatewayOnline, setGatewayOnline] = useState(true);
  const [waterSafe, setWaterSafe] = useState(true);
  const [waterFlowing, setWaterFlowing] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isStale, setIsStale] = useState(false);
  const [activeAlertCount, setActiveAlertCount] = useState(3);
  const [tds, setTds] = useState(280);

  const tickCount = useRef(0);

  const fluctuate = useCallback((base, range) => {
    const delta = (Math.random() - 0.5) * range;
    return Math.max(0.01, +(base + delta).toFixed(3));
  }, []);

  const getStatus = useCallback((pressure) => {
    if (pressure >= 0.15) return 'normal';
    if (pressure >= 0.08) return 'low';
    return 'critical';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      tickCount.current += 1;

      setPressureNodes((prev) => {
        const newP1 = fluctuate(prev.p1.pressure, 0.04);
        const newP2 = fluctuate(prev.p2.pressure, 0.03);
        const newP3 = fluctuate(prev.p3.pressure, 0.03);
        const flowP1P2 = Math.max(8, Math.round(12 + (Math.random() - 0.5) * 4));
        const flowP2P3 = Math.max(6, Math.round(10 + (Math.random() - 0.5) * 4));

        return {
          p1: { ...prev.p1, pressure: newP1, status: getStatus(newP1), flowRate: flowP1P2 },
          p2: { ...prev.p2, pressure: newP2, status: getStatus(newP2), flowRate: flowP2P3 },
          p3: { ...prev.p3, pressure: newP3, status: getStatus(newP3), flowRate: flowP2P3 },
        };
      });

      setBattery((prev) => Math.max(0, +(prev - 0.1).toFixed(1)));
      setTds((prev) => {
        const change = (Math.random() - 0.5) * 6;
        const nextVal = Math.round(prev + change);
        return Math.min(500, Math.max(150, nextVal));
      });
      setGatewayOnline(Math.random() > 0.01);
      setLastUpdated(new Date());
      setIsStale(false);

      if (tickCount.current % 20 === 0) {
        setActiveAlertCount((prev) => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fluctuate, getStatus]);

  const pressureDropAnomaly = (() => {
    const dropP1P2 = pressureNodes.p1.pressure - pressureNodes.p2.pressure;
    const dropP2P3 = pressureNodes.p2.pressure - pressureNodes.p3.pressure;
    return {
      p1p2: dropP1P2 > 0.12,
      p2p3: dropP2P3 > 0.12,
    };
  })();

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return {
    pressureNodes,
    battery,
    gatewayOnline,
    waterSafe,
    waterFlowing,
    lastUpdated,
    isStale,
    activeAlertCount,
    pressureDropAnomaly,
    formatLastUpdated,
    tds,
  };
};

export default useLiveData;
