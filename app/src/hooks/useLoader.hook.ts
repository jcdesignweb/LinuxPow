import { HeaderLoader } from "@/components/header-loader";
import React, { useState } from "react";

const useLoader = () => {
    const [loading, setLoading] = useState(false);
    return [
        loading ? HeaderLoader : null,
            () => setLoading(true),
                () => setLoading(false),
    ];
  };
export default useLoader;