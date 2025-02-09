<?php

if (! function_exists('makeFullName')) {
    function makeFullName(?string $first = '', ?string $last = ''): ?string
    {
        $fullName = trim(sprintf('%s %s', $first, $last));

        return ! empty($fullName) ? $fullName : null;
    }
}
