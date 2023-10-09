# Fetchpriority Control

## Description
Extends the core image block with a fetchpriority setting.

Since WordPress 6.4, core adds the `fetchpriority="high"` attribute to the image it estimates will be the LCP image. This plugin allows you to override that setting with a UI control (a dropdown).

By setting the fetchpriority to a specific image you want to prioritize, WordPress core will honor your selection and skip applying the attribute automatically.

Similarly , if you have an image you want to make sure isn't prioritized, you can set the fetchpriority to "low" and WordPress core will not change that priority.

The new Fetchpriority selector under Advanced when an image block is selected:

![Monosnap Edit Post “test” ‹ wpdev — WordPress 2023-10-09 11-15-26](https://github.com/adamsilverstein/wp-fetchpriority-control/assets/2676022/31795280-82d3-430c-a348-23818c1add28)

Fetchpriority options:

![Monosnap Monosnap 2023-10-09 11-16-09](https://github.com/adamsilverstein/wp-fetchpriority-control/assets/2676022/8c97186d-7355-44fa-9ae9-c64fde9a6c9c)

