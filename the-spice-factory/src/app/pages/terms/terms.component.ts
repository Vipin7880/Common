import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  template: `
    <section class="page-hero page-hero--terms">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Legal</span>
          <h1>General Terms &<br>Conditions of Sale</h1>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="legal-content">
          <h2>1. General</h2>
          <p>These general terms and conditions of sale ("GTCs") apply to all offers, orders, and agreements for the sale of products by The Spice Factory NV/SA, with registered office at Avenue de l'Industrie 20, 1420 Braine-l'Alleud, Belgium, registered under company number BE 0425.674.103 ("The Spice Factory", "we", "us").</p>
          <p>By placing an order with The Spice Factory, the customer accepts these GTCs. Any deviating terms of the customer shall only apply if expressly accepted in writing by The Spice Factory.</p>

          <h2>2. Orders and Confirmation</h2>
          <p>All orders are subject to acceptance by The Spice Factory. An order shall only be binding upon written confirmation by The Spice Factory or upon delivery of the goods. The Spice Factory reserves the right to refuse any order without giving reasons.</p>
          <p>Any modifications or cancellations of orders must be communicated in writing and are subject to acceptance by The Spice Factory. The Spice Factory may charge cancellation fees in case of late cancellations.</p>

          <h2>3. Prices and Payment</h2>
          <p>All prices are exclusive of VAT and any other applicable taxes, unless explicitly stated otherwise. The Spice Factory reserves the right to adjust prices in case of significant changes in raw material costs, exchange rates, or other market conditions.</p>
          <p>Payment terms are 30 days net from the date of invoice, unless otherwise agreed in writing. Late payments shall bear interest at the statutory rate, increased by 2%, calculated from the due date until full payment. In addition, a flat-rate compensation of 10% of the outstanding amount (minimum €75) shall be due as penalty clause.</p>

          <h2>4. Delivery</h2>
          <p>Delivery times indicated by The Spice Factory are approximate and not binding. Delays in delivery shall not entitle the customer to claim damages or cancel the order, unless explicitly agreed otherwise in writing.</p>
          <p>Delivery is deemed to have taken place when the goods are made available at The Spice Factory's premises (Ex Works, according to Incoterms 2020), unless otherwise agreed in writing. Risk of loss or damage to the goods passes to the customer upon delivery.</p>

          <h2>5. Quality and Specifications</h2>
          <p>The Spice Factory guarantees that all products comply with applicable food safety regulations and the specifications agreed upon with the customer. Product specifications may vary within the tolerances customary in the industry.</p>
          <p>The customer must inspect the goods upon receipt and report any visible defects within 48 hours of delivery. Hidden defects must be reported within 8 days of discovery and in any case within 3 months of delivery.</p>

          <h2>6. Liability</h2>
          <p>The Spice Factory's liability is limited to the replacement of defective goods or, at its option, the refund of the purchase price of the defective goods. In no event shall The Spice Factory be liable for indirect, special, incidental, or consequential damages.</p>
          <p>The Spice Factory's total liability for any and all claims arising under or in connection with an order shall not exceed the total amount invoiced for the relevant order.</p>

          <h2>7. Intellectual Property</h2>
          <p>All intellectual property rights related to The Spice Factory's products, recipes, formulations, and packaging designs remain the exclusive property of The Spice Factory, unless otherwise agreed in writing.</p>

          <h2>8. Confidentiality</h2>
          <p>Both parties undertake to keep confidential all commercial and technical information received from the other party in connection with the business relationship. This obligation survives the termination of the business relationship.</p>

          <h2>9. Force Majeure</h2>
          <p>The Spice Factory shall not be liable for any failure or delay in performing its obligations if such failure or delay results from circumstances beyond its reasonable control, including but not limited to natural disasters, war, strikes, pandemics, government actions, or supply chain disruptions.</p>

          <h2>10. Applicable Law and Jurisdiction</h2>
          <p>These GTCs and all agreements between The Spice Factory and the customer are governed by Belgian law. Any disputes arising from or in connection with these GTCs shall be submitted to the exclusive jurisdiction of the courts of Nivelles, Belgium.</p>

          <div class="legal-footer mt-5">
            <p class="text-muted"><strong>The Spice Factory NV/SA</strong></p>
            <p class="text-muted">Avenue de l'Industrie, 20<br>1420 Braine-l'Alleud, Belgium</p>
            <p class="text-muted">Last updated: January 2026</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class TermsComponent { }
