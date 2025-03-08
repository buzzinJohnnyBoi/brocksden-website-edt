'use server'
import { writeFile } from 'fs/promises';
import path from 'path';

export default async function uploadImage(image, name) {
    new Promise(async (resolve, reject) => {
        console.log(image);
        const formData = image;

        const file = formData.get("image");
        if (!file) {
            resolve(false);
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());

        try {
            await writeFile(
                path.join(process.cwd(), "../images/images/" + name),
                buffer,
                { encoding: 'binary' }
            );
            resolve(true);
        } catch (error) {
            console.log("Error occurred ", error);
            resolve(false);
        }
    });
}