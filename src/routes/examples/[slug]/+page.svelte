<script lang="ts">
    import { RunesMetaTags } from 'runes-meta-tags';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
    let Content = $derived(data.content);
</script>

<RunesMetaTags {...data.pageMetaTags} />
<Content />
