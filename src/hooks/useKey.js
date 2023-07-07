import { useState, useEffect } from "react";

export function useKey(key, func)  {
  useEffect(() => {
      const callback = (e) => {
        if (e.key.toLowerCase() !== key.toLowerCase()) return;
        func();
      };
  
      document.addEventListener('keydown', callback);
  
      return function () {
        document.removeEventListener('keydown', callback);
      };
    }, [key, func]);
}