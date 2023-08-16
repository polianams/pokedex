import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <center>
        <Image
          src="/imagens/loading.gif"
          alt="Loading"
          width={118}
          height={84}
        />
      </center>
    </div>
  );
}
