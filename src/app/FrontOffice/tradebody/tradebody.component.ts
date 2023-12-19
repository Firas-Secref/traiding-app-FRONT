import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ClaimService } from 'src/app/claim.service';

@Component({
  selector: 'app-tradebody',
  templateUrl: './tradebody.component.html',
  styleUrls: ['./tradebody.component.css']
})
export class TradebodyComponent implements OnInit, AfterViewInit  {
  tableData :any;
  tableData1 :any;
  tableData2 :any;
  currentUser: any;
  private tradingViewWidget: any;
  private defaultSymbol = "XAUUSD";
 
  constructor(private claimservice: ClaimService,public userService: UserService) { }

  ngOnInit(): void { this.claimservice.getTableData4().subscribe(data => {
    this.tableData = data;
  });
  this.claimservice.getTableData5().subscribe(data => {
    this.tableData1 = data;
  });
  this.claimservice.getTableData6().subscribe(data => {
    this.tableData2 = data;
  });
  this.userService.getCurrentUser().subscribe(
    (user) => {
      this.currentUser = user;
    },
    (error) => {
      // Handle errors, e.g., user not authenticated or other issues
      console.error('Error:', error);
    }
  );
  
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
        "theme": "dark",
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

  onSymbolChange(symbol: string): void {
    const selectedSymbol = this.getSymbolValue(symbol);

    // Remove the existing TradingView widget
    if (this.tradingViewWidget) {
      this.tradingViewWidget.remove();
      this.tradingViewWidget = null;
    }

    // Load a new TradingView widget with the selected symbol
    this.loadTradingViewWidget(selectedSymbol);
  }
  getSymbolValue(symbol: string): string {
    // Define a mapping function to get the corresponding value for the symbol
    switch (symbol.toLowerCase()) {
      case 'or':
        return 'XAUUSD';
      case 'pétrole wti':
        return 'USOIL';
        case 'bitcoin (btc/usd)':
        return 'BTCUSD';
        case 'ethereum (eth/usd)':
        return 'ETHUSD';
        case 'apple inc.':
        return 'NASDAQ:AAPL';
        case 'microsoft corporation':
        return 'NASDAQ:MSFT';
        
      // Add more cases for other symbols as needed
      default:
        return 'XAUUSD';
    }
}

}