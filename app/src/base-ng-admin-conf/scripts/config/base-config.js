export default function (nga, admin) {

  var Base = nga.entity('base');


  Base.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('edad'),
  ]);

  Base.creationView().fields([
    nga.field('name'),
    nga.field('edad'),
  ]);

  Base.editionView().fields(Base.creationView().fields());

  return Base;
}
