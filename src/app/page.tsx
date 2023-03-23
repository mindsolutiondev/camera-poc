"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [state, setState] = useState<string>('');

  const handleUploadImage = async (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
    const file = evt.target.files[0];
    const base64 = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    setState(String(base64))
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={(evt) => {
          if (!evt) return;
          handleUploadImage(evt)
        }}
      />
      {state && <Image src={state} alt="" width={220} height={220} />}
      {state && <div style={{ marginTop: '10px'}}>State Value: {JSON.stringify(state)}</div>}
    </div>
  );
}
