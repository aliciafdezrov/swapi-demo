import {useCallback, useEffect, useRef} from "react";

export const useAbort = () => {
    const ref = useRef([]);

    const abort = () => {
        if (ref.current.length) {
            ref.current.forEach(c => c.abort());
        }
    }

    const getSignal = useCallback(() => {
        ref.current.push(new AbortController());
        return ref.current[ref.current.length - 1].signal;
    }, [])

    useEffect(() => abort(), []);

    return {signal: getSignal, abort};
}
