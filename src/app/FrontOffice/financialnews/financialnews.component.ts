import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ClaimService } from 'src/app/claim.service';
import { WebsocketService } from 'src/app/websocket.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-financialnews',
  templateUrl: './financialnews.component.html',
  styleUrls: ['./financialnews.component.css']
})
export class FinancialnewsComponent implements OnInit, AfterViewInit {
tableData: any;
 
  tableData1: any;
  tableData2: any;
  private tradingViewWidget: any;
  private defaultSymbol = "XAUUSD"; 
  private subscription!: Subscription;
  messageToSend: string = '';
  constructor(private claimService: ClaimService,private renderer: Renderer2,private webSocketService :WebsocketService) { }

  ngOnInit(): void {this.claimService.getTableData().subscribe(data => {
    this.tableData = data;
  });
  
  this.claimService.getTableData1().subscribe(data => {
    this.tableData1 = data;
  });
  this.claimService.getTableData7().subscribe(data => {
    this.tableData2 = data;
  });
  
  }
  ngAfterViewInit(): void {
    // Load with default symbol
    this.loadTradingViewWidget(this.defaultSymbol);
  }
  
  loadTradingViewWidget(symbol: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => this.createTradingViewWidget(symbol);
    document.head.appendChild(script);
  }

  createTradingViewWidget(symbol: string): void {
    if (!this.tradingViewWidget) {
      // If the widget doesn't exist, create it
      this.tradingViewWidget = new (window as any).TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "fr",
        "enable_publishing": true,
        "allow_symbol_change": true,
        "container_id": "tradingview_c976b"
      });
    } else {
      // If the widget exists, update the symbol
      this.tradingViewWidget.chart().setSymbol(symbol);
    }
  }

  onSymbolChange(event: any): void {
    const selectedSymbol = event.target.value;

    // Remove the existing TradingView widget
    if (this.tradingViewWidget) {
      this.tradingViewWidget.remove();
      this.tradingViewWidget = null;
    }

    // Load a new TradingView widget with the selected symbol
    this.loadTradingViewWidget(selectedSymbol);
  }
 
}