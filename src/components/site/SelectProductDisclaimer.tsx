import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const notes = [
  ["Made to order", "Each FifthPlain Select piece is made specifically for your order. Please allow the stated production time before your order is ready for delivery."],
  ["Colour & appearance", "Colours may appear slightly different from the photos depending on lighting, photography, screen settings, and your device. The finished garment may also have minor differences from the displayed image."],
  ["Design details", "Because each piece is individually made, there may be slight variations in stitching, fabric texture, placement, or finishing. These are not considered defects."],
  ["Sizing", "Please carefully check the size guide and provide accurate measurements where requested before placing your order."],
  ["Alterations", "If alterations are required after the garment has been made, additional alteration fees may apply. These costs are the customer's responsibility."],
  ["Customer measurements", "FifthPlain is not responsible for incorrect measurements or sizing information provided by the customer."],
  ["Fabric availability", "In some cases, the exact fabric shown may become unavailable. If this happens, we will contact you before proceeding with a suitable alternative."],
  ["Personalisation/changes", "Any changes to the original design or additional customisation requested after ordering may result in additional costs."],
  ["Delivery", "Delivery fees are separate from the product price and are calculated/selected according to the delivery option chosen at checkout."],
  ["Please check carefully", "By placing an order, you confirm that you have reviewed the product details, size information, pricing, and applicable notes before purchasing."],
] as const;

export function SelectProductDisclaimer() {
  return (
    <div className="mt-6 border-y border-border py-5">
      <p className="text-xs leading-relaxed text-muted-foreground">
        Please note: Each piece is made to order and may have slight variations from the photos in colour, fabric appearance, stitching and finishing. Please check your measurements carefully before ordering. Alterations requested after production may incur an additional fee. Delivery is charged separately.
      </p>

      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="select-ordering-notes" className="border-0">
          <AccordionTrigger className="py-3 text-[11px] font-normal uppercase tracking-[0.2em] text-ivory hover:no-underline" aria-label="Open important FifthPlain Select ordering information">
            Please Note Before Ordering
          </AccordionTrigger>
          <AccordionContent className="pb-1 pt-1">
            <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              {notes.map(([title, detail]) => (
                <li key={title}>
                  <strong className="font-medium text-ivory">{title}:</strong>{" "}{detail}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}