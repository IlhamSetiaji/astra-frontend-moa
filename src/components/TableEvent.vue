<template> 
<div class="relative">
    <table class="w-full text-sm text-left border-dark divide-y">
        <thead class="text-xs text-gray-700 uppercase border-t">
            <tr class="uppercase">
                <th  class="px-3 py-3">
                    No
                </th>
                <th  class="px-3 py-3">
                    Event/City
                </th>
                <th  class="px-3 py-3">
                    Games
                </th>
                <th  class="px-3 py-3">
                    NV
                </th>
                <th  class="px-3 py-3">
                    Visitor
                </th>
                <th  class="px-3 py-3">
                    SPK
                </th>
                <th  class="px-3 py-3 w-40">
                    TOOLS
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b">
                <th scope="row" class="px-3 py-2 font-medium">
                    1
                </th>
                <td class="px-3 py-2">
                    Silver
                </td>
                <td class="px-3 py-2">
                    Laptop
                </td>
                <td class="px-3 py-2">
                    $2999
                </td>
                <td class="px-3 py-2">
                    $2999
                </td>
                <td class="px-3 py-2">
                    $2999
                </td>
                <td class="px-3 py-2 flex gap-2 w-fit">
                    <a href="#" class="font-medium"><img class="w-5" src="icon_open.png" /></a>
                    <a href="#" class="font-medium"><img class="w-4" src="edit.png" /></a>
                    <a href="#" class="font-medium"><img class="w-4" src="remove.png" /></a>
                    <a href="#" class="font-medium"><img class="w-5" src="visibility.png" /></a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
export default {
    name: 'TableEvent',
    components: {

    }
}
</script>