@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'SUNBNB')
<img src="https://utfs.io/f/8115b589-0835-4149-b27a-ab417e9b0f2b-si8amm.svg" class="logo" alt="Laravel Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
