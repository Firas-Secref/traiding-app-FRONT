import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  @ViewChild('tradingviewContainer') tradingviewContainer!: ElementRef;

   widgetsConfig: any[] = [
    { symbol: "OANDA:XAUUSD", title: "" },
    { symbol: "NASDAQ:AAPL", title: "" },
    { symbol: "BTCUSD", title: "" },
    { symbol: "BINANCE:ETHUSDT", title: "" },
    { symbol: "NASDAQ:MSFT", title: "" },
    { symbol: "TVC:USOIL", title: "" }
    // Add more widgets as needed
  ];

   widgetsPerPage = 3;
   currentPage = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.loadWidgets();
  }
  ngAfterViewInit() {
    this.loadWidgets();
  }
  ngOnDestroy() {
    // Cleanup or handle anything necessary on component destruction
  }

  loadWidgets() {
    const startIndex = this.currentPage * this.widgetsPerPage;
    const endIndex = startIndex + this.widgetsPerPage;
    const widgetsToLoad = this.widgetsConfig.slice(startIndex, endIndex);

    widgetsToLoad.forEach((widget, index) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.async = true;

      script.text = `
        {
          "interval": "1m",
          "width": 300,
          "isTransparent": false,
          "height": 400,
          "symbol": "${widget.symbol}",
          "showIntervalTabs": true,
          "displayMode": "single",
          "locale": "fr",
          "colorTheme": "dark"
        }
      `;

      const container = this.renderer.createElement('div');
      container.classList.add('tradingview-widget-container');
      this.renderer.appendChild(container, script);
      this.renderer.appendChild(container, this.renderer.createText(widget.title));
      
      const targetContainer = this.tradingviewContainer.nativeElement;
      this.renderer.appendChild(targetContainer, container);
    });
  }

  changePage(newPage: number) {
    if (newPage >= 0 && newPage * this.widgetsPerPage < this.widgetsConfig.length) {
      this.currentPage = newPage;
      this.clearWidgets();
      this.loadWidgets();
    }
  }

  clearWidgets() {
    const targetContainer = this.tradingviewContainer.nativeElement;
    this.renderer.setProperty(targetContainer, 'innerHTML', '');
  }
}
