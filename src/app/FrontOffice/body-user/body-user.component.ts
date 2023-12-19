import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ClaimService } from 'src/app/claim.service';


@Component({
  selector: 'app-body-user',
  templateUrl: './body-user.component.html',
  styleUrls: ['./body-user.component.css']
})
export class BodyUserComponent implements OnInit, AfterViewInit {
  currentUser: any;
  greeting: string = '';
  tableData :any;
  tableData1 :any;
  tableData2 :any;
  private tradingViewWidget: any;
  private defaultSymbol = "XAUUSD";
  amountInUSD!: number ;
  amountInTND!: number ;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,private http: HttpClient,private claimservice: ClaimService,private renderer: Renderer2 ) { }

  ngOnInit(): void { this.claimservice.reloadOnce();
    this.userService.getCurrentUser().subscribe(
    (user) => {
      this.currentUser = user;
    },
    (error) => {
      // Handle errors, e.g., user not authenticated or other issues
      console.error('Error:', error);
    }
  );
   
    this.claimservice.getTableData4().subscribe(data => {
      this.tableData = data;
    });
    this.claimservice.getTableData5().subscribe(data => {
      this.tableData1 = data;
    });
    this.claimservice.getTableData6().subscribe(data => {
      this.tableData2 = data;
    });
    this.loadTradingViewScript();
    this.loadTradingViewScript1();
    this.loadTradingViewScript2();
    

    // Subscribe to updates from the WebSocket
    
  }
  ngAfterViewInit(): void {
    // Load with default symbol
    this.loadTradingViewWidget(this.defaultSymbol);
  }
  
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['']);
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
  private loadTradingViewScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.async = true;

    // Add your widget configuration here
    script.text = `
      {
        "exchanges": [],
        "dataSource": "SPX500",
        "grouping": "sector",
        "blockSize": "market_cap_basic",
        "blockColor": "change",
        "locale": "fr",
        "symbolUrl": "",
        "colorTheme": "light",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "width": "700",
        "height": "500"
      }
    `;

    const container = document.querySelector('.tradingview-widget-container'); // Use the appropriate selector
    this.renderer.appendChild(container, script);
  }
  private loadTradingViewScript1() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
    script.async = true;

    // Add your widget configuration here
    script.text = `
      {
        "dataSource": "Crypto",
        "blockSize": "market_cap_calc",
        "blockColor": "change",
        "locale": "fr",
        "symbolUrl": "",
        "colorTheme": "light",
        "hasTopBar": false,
        "isDataSetEnabled": false,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "width": "700",
        "height": "500"
      }
    `;

    const container = document.querySelector('.tradingview-widget-container1');
    this.renderer.appendChild(container, script);
  }
  private loadTradingViewScript2() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    // Add your widget configuration here
    script.text = `
      {
        "symbols": [
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR vers USD"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          },
          {
            "description": "Gold",
            "proName": "OANDA:XAUUSD"
          },
          {
            "description": "OIL",
            "proName": "TVC:USOIL"
          },
          {
            "description": "Apple",
            "proName": "NASDAQ:AAPL"
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "fr"
      }
    `;

    const container = document.querySelector('.tradingview-widget-container2');
    this.renderer.appendChild(container, script);
  }
  convertUSDToTND() {
    this.claimservice
      .convertUSDToTND(this.amountInUSD)
      .subscribe((result) => {
        this.amountInTND = result;
      });
  }
}
