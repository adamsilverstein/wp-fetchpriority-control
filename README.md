# Fetchpriority Control

## Description
Extends the core image block with a fetchpriority setting.

Since WordPress 6.4, core adds the `fetchpriority="high"` attribute to the image it estimates will be the LCP image. This plugin allows you to override that setting with a UI control (a dropdown).

By setting the fetchpriority to a specific image you want to prioritize, WordPress core will honor your selection and skip applying the attribute automatically.

Similarly , if you have an image you want to make sure isn't prioritized, you can set the fetchpriority to "low" and WordPress core will not change that priority..