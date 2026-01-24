import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";

type ProductTab = {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt?: string;
  caption?: string;
};

type ProductTabsProps = {
  tabs: ProductTab[];
};

export function ProductTabs({ tabs }: ProductTabsProps) {
  if (!tabs.length) return null;

  return (
    <Tabs defaultSelectedKey={tabs[0].id}>
      {/* Tab list */}
      <div className="border-b border-neutral-200">
        <TabList className="-mb-px flex gap-6 text-sm font-medium overflow-auto">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              className="whitespace-nowrap cursor-pointer pb-2 border-b-2 outline-none text-neutral-500 border-transparent hover:text-neutral-700 data-selected:text-indigo-600 data-selected:border-indigo-600 data-focus-visible:ring-2 data-focus-visible:ring-indigo-600 data-focus-visible:ring-offset-2"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </div>

      {/* Panels */}
      {tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} className="mt-8">
          <figure>
            <img
              src={tab.imageSrc}
              alt={tab.imageAlt ?? ""}
              className="w-full rounded-lg border border-neutral-200"
            />
            {tab.caption && (
              <figcaption className="mt-3 text-sm text-neutral-500">
                {tab.caption}
              </figcaption>
            )}
          </figure>
        </TabPanel>
      ))}
    </Tabs>
  );
}
