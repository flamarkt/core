/**
 * The way Flarum parses relationships inside of the save() method prevents us from saving data alongside the relation
 * To work around this, we override this method that will allow us to pass down raw objects directly in the model during save
 * The same code is used in fof/taxonomies
 */
export default function (): void;
