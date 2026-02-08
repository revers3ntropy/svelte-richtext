import type { MetaProps } from 'runes-meta-tags';
import { metaDescription } from 'runes-meta-tags';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
    // Dynamic import for the content
    const post = await import(`../${params.slug}.svelte`);
    const content = post.default;

    // Meta tags generation
    const title = 'Flowbite-Svelte-TextEditor';
    const basicDesc = 'Tiptap powered text editor for Svelte';
    const description = metaDescription(url.pathname, basicDesc);
    // const image = metaImg(url.pathname, siteName);

    const pageMetaTags: MetaProps = {
        title,
        description,
        og: {
            title,
            description
        },
        twitter: {
            title,
            description
        }
    };

    return {
        content,
        pageMetaTags
    };
};
