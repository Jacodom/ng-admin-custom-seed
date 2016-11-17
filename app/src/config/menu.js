export default function (nga, admin) {
    return nga.menu()
    .addChild(nga.menu(admin.getEntity('baseModule')).title('Module'))
    /* Add all the menu items and their subitems */
    ;
}
