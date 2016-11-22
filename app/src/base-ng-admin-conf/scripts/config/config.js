export default function (nga, admin) {

  var Entities = admin.getEntity('entities');
  var Categories = nga.entity('categories');
  var rubrosConEntidades = nga.entity('categories/has_entities');
  var Cities = nga.entity('cities').label("Ciudades");
  var Tags = nga.entity('tags');

  Entities.listView()
  .fields([
    nga.field('name').isDetailLink(true).label('Nombre'),
    nga.field('categories', 'template').label('Rubros')
    .template('<span ng-repeat="category in entry.values.categories track by $index" class="label label-default">{{ category.name }}</span>')
    .cssClasses('hidden-xs'),
    nga.field('activate', 'template')
    .label('Estado')
    .template('<active-entity ng-if="!entry.values.active" entry="entry"></active-entity><deactive-entity ng-if="entry.values.active" entity="entry"></deactive-entity>'),

    nga.field('ver', 'template')
    .label('Ver')
    .pinned(true)
    .template(
      '<ma-filtered-list-button class="btn-warning" entity-name="adverts" filter="{ entityId: entry.values.id }" size="xs" label="Promociones"></ma-filtered-list-button>'
    )
  ]).filters([
    nga.field('categories', 'reference')
    .label('Rubro')
    .perPage(100000)
    .pinned(false)
    .targetEntity(rubrosConEntidades)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Elegir Rubro' }),

    nga.field('name', 'template')
    .label('Buscar por nombre')
    .pinned(true)
    .template('<search id="1" placeholder="escribir cualquier parte del nombre"></search>'),

    nga.field('address', 'template')
    .label('Buscar por calle')
    .pinned(false)
    .template('<search placeholder="Filtrar..."></search>'),

    nga.field('cityId', 'reference')
    .label('Ciudad')
    .perPage(100000)
    .pinned(false)
    .targetEntity(Cities)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Elegir Ciudad' }),

    nga.field('tags', 'reference')
    .label('Tags')
    .perPage(100000)
    .pinned(false)
    .targetEntity(Tags)
    .targetField(nga.field('name'))
    .attributes({ placeholder: 'Describir Tag' })

  ])
  .actions(['batch','filter','<ma-create-button entity="::entity" label="Nueva"></ma-create-button>'])
  .listActions([
    '<ma-edit-button size="xs" entry="entry" entity="entity" label="Editar"></ma-edit-button>',
    '<ma-delete-button size="xs" entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ])
  .title('Entidades');

  Entities.creationView().fields([
    nga.field('name').label('Nombre'),
    nga.field('description','text').label('Descripción'),

    nga.field('belongsToCategory', 'reference_many')
    .label("Rubros")
    .perPage(10000)
    .targetEntity(Categories)
    .permanentFilters({ "has_entities": true })
    .targetField(nga.field('name')),

    nga.field('hasTags', 'reference_many')
    .label("Tags")
    .perPage(10000)
    .targetEntity(Tags)
    .targetField(nga.field('name'))

  ]).title('Nueva Entidad');

  Entities.editionView().fields([

    nga.field('submit', 'template')
    .template('<input class="btn btn-info button-submit-form" type="submit" id="submitForm" value="Guardar cambios" ng-click="formController.submitEdition($event)">',true),

    nga.field('dummy').label('').template('<h3>Información básica:</h3>'),
    nga.field('name').label('Nombre'),
    nga.field('description', 'text').label('Quiénes somos'),
    nga.field('shortTimeDesc').attributes({ placeholder: 'Máximo 40 caractéres' }).validation({ maxlength: 40 })
    .label('“Dirección especifica'),

    nga.field('dummy').label('').template('<h3>Ubicación en la app:</h3>'),

    nga.field('dummy').label('').template('Seleccione los rubros correspondientes a su negocio.'),
    nga.field('belongsToCategory', 'reference_many')
    .label("Rubros")
    .perPage(10000)
    .targetEntity(Categories)
    .permanentFilters({ "has_entities": true })
    .targetField(nga.field('name')),

    nga.field('dummy').label('').template('Las tags sirven para que los usuarios ubiquen su negocio en una búsqueda. Seleccione entre las tags existentes o agregue nuevas.'),
    nga.field('hasTags', 'reference_many')
    .label("Tags")
    .perPage(10000)
    .targetEntity(Tags)
    .targetField(nga.field('name')),

    nga.field('hasTags').label('').template('<add-new-tag entry="entry" datastore="datastore"></add-new-tag>'),

    nga.field('dummy').label('').template('<h3>Datos de contacto:</h3>'),
    nga.field('address').label('Dirección'),
    nga.field('cityId', 'reference').label('Ciudad')
    .targetEntity(Cities).targetField(nga.field('name')),

    nga.field('geoLocation', 'template')
    .label('Obtener Geo localización')
    .template('<geo></geo>'),

    nga.field('phone').label('Teléfono Fijo'),
    nga.field('mobile').label('Teléfono Celular'),
    nga.field('email').label('E-mail'),
    nga.field('website').label('Página Web'),
    nga.field('facebook').label('Facebook'),
    nga.field('twitter').label('Twitter'),
    nga.field('whatsapp').label('Whatsapp'),
    nga.field('instagram').label('Instagram'),

    nga.field('dummy').label('').template('<h3>Información Comercial:</h3>'),
    nga.field('dummy').label('').template('<services></services>'),
    nga.field('services', 'wysiwyg').label('Servicios').stripTags(false),
    nga.field('timeSheet','wysiwyg').label('Horarios'),
    nga.field('productSheet','wysiwyg').label('Productos'),
    nga.field('dummy').label('').template('<payment></payment>'),
    nga.field('paymentSheet','wysiwyg').label('Formas de pago'),

    nga.field('dummy').label('').template('<h3>Imagenes:</h3>'),
    nga.field('logo', 'template')
    .label('Logotipo (imagen de baja resolución)')
    .template('<entity-image target="logo"></entity-image>'),
    nga.field('cover', 'template')
    .label('Portada (imagen widescreen de baja resolución)')
    .template('<entity-image target="cover"></entity-image>'),
    nga.field('webcover', 'template')
    .label('Cover web (imagen de alta resolución)')
    .template('<entity-image target="webcover"></entity-image>'),
    nga.field('photos', 'template')
    .label('Fotos')
    .template('<entity-image target="photo" multi="true"></entity-image>'),
    nga.field('qrcode', 'template')
    .label('Código QR')
    .template('<entity-image target="qrcode"></entity-image>'),

    nga.field('dummy').label('').template('<h3>Datos de Sistema:</h3>'),

    nga.field('subdomain', 'template')
    .label('Subdominio')
    .template('<subdomain></subdomain>'),

    nga.field('template', 'choice')
    .defaultValue("uno")
    .attributes({ placeholder: 'Plantilla' })
    .choices([
      { value: 'uno', label: 'Plantilla 1' },
      { value: 'dos', label: 'Plantilla 2' },
      { value: 'tres', label: 'Plantilla 3' }
    ]).label('Tipo perfíl')

  ])
  .title('Editar Entidad')
  .actions([
    '<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>',
    '<ma-delete-button entry="entry" entity="entity" label="Borrar"></ma-delete-button>'
  ]);

  Entities.deletionView().fields(
    nga.field('name').label('Nombre')
  )
  .actions(['<ma-list-button entry="entry" entity="entity" label="Lista"></ma-list-button>'])
  .title('Borrar Entidad "{{ entry.values.name }}"');

  return Entities;
}
