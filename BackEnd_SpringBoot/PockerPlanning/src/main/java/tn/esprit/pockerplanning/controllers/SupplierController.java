package tn.esprit.pockerplanning.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pockerplanning.entities.Supplier;
import tn.esprit.pockerplanning.services.SupplierService;

import java.util.List;


@RestController
@RequestMapping("/supplier")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {
	
	@Autowired
	SupplierService fserv;
	
	 
			@PostMapping("/add")
			public Supplier addSupplier(@RequestBody Supplier f){
				return fserv.addSupplier(f);
			}

			 
			@PutMapping("/update/{id}")
			public Supplier updateSupplier(@RequestBody Supplier f, @PathVariable("id")Long id){
				return fserv.updateSupplier(f,id);
			}
			
			 
			 @DeleteMapping("/delete/{id}")
			 public String deleteSupplier(@PathVariable("id")Long id ){
				 fserv.deleteSupplier(id);
				 return "this supplier was deleted with success";
			 }
			 
			 
			  @GetMapping("/getbyid/{id}")
			  public Supplier getSupplier(@PathVariable("id")Long id){
				  return fserv.getSupplier(id);
			  }
			  
		 
			  @GetMapping("/getall")
			  public List<Supplier> getSuppliers(){
				  return fserv.getSuppliers();
			  }


}
