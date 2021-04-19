import fs from "fs";
import path from "path";
import remark from 'remark'
import html from 'remark-html'
import matter, { GrayMatterFile } from "gray-matter";

const postsDirectory:string = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames:string[] = fs.readdirSync(postsDirectory);
    const allPostsData:any[] = fileNames.map((fileName:any): any => {
        const id:string = fileName.replace(/\.md$/, '');
        const fullPath:string = path.join(postsDirectory, fileName);
        const fileContents:string = fs.readFileSync(fullPath, 'utf8');
        const matterResult:GrayMatterFile<string> = matter(fileContents);

        return {
            id,
            ...matterResult.data
        };
    });

    return allPostsData.sort((a:any, b:any): number => {
        if(a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames:string[] = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName:any): any => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    });
}

export async function getPostData(id) {
    const fullPath: string = path.join(postsDirectory, `${id}.md`);
    const fileContents: string = fs.readFileSync(fullPath, 'utf-8');

    const matterResult:GrayMatterFile<string> = matter(fileContents);

    const processedContent: any = await remark()
    .use(html)
    .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
