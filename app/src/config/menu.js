export default function (nga, admin) {
    return nga.menu()
    .addChild(nga.menu(admin.getEntity('base')).title('Base'))
    /* Add all the menu items and their subitems */
    ;
}
