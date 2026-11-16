import Form from "next/form";
import Link from "next/link";
import { buttonClasses } from "./button-styles";
import { Icon, type IconName } from "./Icon";
import { Select } from "./Select";

export type FilterField =
  | {
      type: "select";
      name: string;
      label: string;
      icon: IconName;
      /** First option = "all" (empty value). */
      allLabel: string;
      options: string[];
      value?: string;
    }
  | {
      type: "search";
      name: string;
      label: string;
      icon: IconName;
      placeholder: string;
      value?: string;
    };

/**
 * Filter box above a list. It is a GET form: the choices go into the URL
 * (?region=…&q=…), so a filtered list can be shared and the back button works.
 */
export function FilterBar({
  action,
  fields,
  hasFilters,
  keep,
  clearHref,
}: {
  /** The page path, e.g. "/hotels". */
  action: string;
  fields: FilterField[];
  /** Shows a "Clear filters" link. */
  hasFilters: boolean;
  /** Other URL values to keep when this form is sent (e.g. the filters of another list on the page). */
  keep?: Record<string, string | undefined>;
  /** Where "Clear" goes (default: `action`). */
  clearHref?: string;
}) {
  // Re-mount after every search, so the dropdowns show the values in the URL.
  const formKey = fields.map((field) => field.value ?? "").join("|");

  return (
    <Form
      key={formKey}
      action={action}
      role="search"
      className="grid gap-1 rounded-xl bg-white p-2.5 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line lg:grid-flow-col lg:auto-cols-fr lg:items-center lg:divide-x lg:divide-line lg:p-3"
    >
      {Object.entries(keep ?? {}).map(([name, value]) => (value ? <input key={name} type="hidden" name={name} value={value} /> : null))}
      {fields.map((field) => {
        const id = `filter-${field.name}`;
        return (
          <div key={field.name} className="flex items-center gap-4 rounded-lg px-4 py-3 focus-within:bg-sand/60">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brass-100 text-brass-600">
              <Icon name={field.icon} size={18} strokeWidth={1.75} />
            </span>
            <div className="relative min-w-0 flex-1">
              <label id={`${id}-label`} htmlFor={id} className="block text-[0.8125rem] text-ink-500">
                {field.label}
              </label>
              {field.type === "select" ? (
                <Select
                  id={id}
                  name={field.name}
                  labelledBy={`${id}-label`}
                  defaultValue={field.value ?? ""}
                  options={[
                    { value: "", label: field.allLabel },
                    ...field.options.map((option) => ({ value: option, label: option })),
                  ]}
                  className="mt-0.5"
                  listClassName="-left-[3.5rem] w-[calc(100%_+_4.5rem)] min-w-60"
                  gap={18}
                  gapUp={52}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type="search"
                  defaultValue={field.value ?? ""}
                  placeholder={field.placeholder}
                  className="mt-0.5 w-full bg-transparent text-base font-medium text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-300"
                />
              )}
            </div>
          </div>
        );
      })}

      <div className="flex items-center gap-3 p-2 lg:pl-4">
        <button type="submit" className={buttonClasses({ size: "lg", className: "h-12 flex-1 lg:flex-none" })}>
          <Icon name="search" size={18} />
          Search
        </button>
        {hasFilters && (
          <Link href={clearHref ?? action} className="text-sm whitespace-nowrap text-ink-500 underline-offset-4 hover:text-brass-600 hover:underline">
            Clear
          </Link>
        )}
      </div>
    </Form>
  );
}
